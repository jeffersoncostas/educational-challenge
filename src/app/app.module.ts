import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { ProfessoresComponent } from './pages/professores/professores.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ChartComponent } from './components/chart/chart.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { FormsModule } from '@angular/forms';
import { ButtonToggleComponent } from './components/button-toggle/button-toggle.component';
@NgModule({
    entryComponents: [AlunosComponent, ModalEditComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        AlunosComponent,
        ProfessoresComponent,
        SearchInputComponent,
        ChartComponent,
        ModalEditComponent,
        ButtonToggleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
