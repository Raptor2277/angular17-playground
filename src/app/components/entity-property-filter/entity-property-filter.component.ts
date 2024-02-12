import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem, SelectItem } from 'primeng/api';
import { Menu } from 'primeng/menu';


type FilteredEntitiesChanged = (entities: any[]) => void;
class ApplicableEntityFilter {
  public fc: FormControl<SelectItem[]>;
  public propertyFilter: string;

  public startingEntities: any[];
  public filteredEntities: any[] = [];
  public options: SelectItem[];
  public enabled = true;
  public callback: FilteredEntitiesChanged;

  constructor(propertyFilter: string, startingEntities: any[], callback: FilteredEntitiesChanged) {
    this.startingEntities = startingEntities;
    this.propertyFilter = propertyFilter;
    this.callback = callback;

    const optionsSet = new Set(startingEntities.map(e => e[propertyFilter]));
    this.options = [...optionsSet].map(e => ({ label: e, value: e } as SelectItem));

    this.fc = new FormControl<SelectItem<any>[]>([...this.options], { nonNullable: true });
    this.filteredEntities = [...startingEntities];

    this.fc.valueChanges.subscribe(e => this.selectedChanges(e));
  }

  public selectedChanges(e: SelectItem[]) {
    const filterSet = new Set(e.map(e => e.value));
    this.filteredEntities = this.startingEntities.filter(e => {
      return filterSet.has(e[this.propertyFilter]);
    });

    this.callback(this.filteredEntities);
  }

  public applyFilter(entities: any[]): any[] {
    var values = new Set(this.fc.value);
    return entities.filter(e => values.has(e[this.propertyFilter]));
  }
}

@Component({
  selector: 'app-entity-property-filter',
  templateUrl: './entity-property-filter.component.html',
  styleUrl: './entity-property-filter.component.scss'
})
export class EntityPropertyFilterComponent implements OnInit {

  @Input({ required: true }) entities!: any[];
  @Output() onFilteredEntitiesChanged = new EventEmitter<any[]>;

  appliedFilters: ApplicableEntityFilter[] = [];

  filteredEntities: any[] = [];

  menuItems: MenuItem[] = [];

  constructor() {
  }
  ngOnInit(): void {
    const entity = this.entities[0];

    if (entity !== null || entity !== undefined)
      this.menuItems = Array.from(Object.keys(entity)).map(e => {
        return {
          label: e,
          command: () => this.addEntityFilter(e),
        }
      })
  }

  getLastEntityFilter(){
    return this.appliedFilters[this.appliedFilters.length - 1];
  }

  addEntityFilter(property: string) {
    const last = this.getLastEntityFilter();
    const startingEntities = last?.filteredEntities || this.entities;

    if (last) last.enabled = false;

    this.appliedFilters = [...this.appliedFilters, new ApplicableEntityFilter(property, startingEntities, e => this.filteredEntitiesChanged(e))];
  }

  popEntityFilter(){
    this.appliedFilters.pop();

    const last = this.getLastEntityFilter();

    if (last) last.enabled = true;
  }

  filteredEntitiesChanged(entities: any[]) {
    this.onFilteredEntitiesChanged.emit(entities);
  }
}
