import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import {NewFileComponent} from './newFile/newFile.component';
import {CategoryComponent} from './category/category.component';

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
    AppComponent, HistoryComponent, NewFileComponent, CategoryComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
