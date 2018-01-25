import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { HistoryComponent } from './history/history.component';
import {NewFileComponent} from './newFile/newFile.component';
import {CategoryComponent} from './category/category.component';
import {CategoryDialogComponent} from './category-dialog/category-dialog.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'newFile', component: NewFileComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'category', component: CategoryComponent },
    ],
  }
];


@NgModule({
  declarations: [
    AppComponent, HistoryComponent, NewFileComponent, CategoryComponent, CategoryDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CategoryDialogComponent]
})
export class AppModule { }
