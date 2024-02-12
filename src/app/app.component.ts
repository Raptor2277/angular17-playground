import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { merge } from 'rxjs';


class ApplicableEntityFilter {

  protected fc: FormControl<string[]>;
  constructor(fc: FormControl<string[]>) {
    this.fc = fc;
  }

  public applyFilter(entities: Entity[]): Entity[] {
    throw "not implemented";
  }
}

class BusinessEntityFilter extends ApplicableEntityFilter {
  constructor(fc: FormControl<string[]>) {
    super(fc);
  }

  public override applyFilter(entities: Entity[]): Entity[] {
    var values = new Set(this.fc.value);
    return entities.filter(e => values.has(e.business));
  }
}

class StateEntityFilter extends ApplicableEntityFilter {
  constructor(fc: FormControl<string[]>) {
    super(fc);
  }

  public override applyFilter(entities: Entity[]): Entity[] {
    var values = new Set(this.fc.value);
    return entities.filter(e => values.has(e.model));
  }
}

interface Entity {
  state: string,
  business: string,
  model: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  filteredEntities: any[] = []

  appliedFilters: ApplicableEntityFilter[] = [];

  constructor() {
   
  }

  onEntityChange(entities: any[]){
    this.filteredEntities = entities;
  }
}
