import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from "primeng/button";
import { MenuModule } from 'primeng/menu';
import { EntityPropertyFilterComponent } from './components/entity-property-filter/entity-property-filter.component'



@NgModule({
  declarations: [
    AppComponent,
    EntityPropertyFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MultiSelectModule,
    ButtonModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
