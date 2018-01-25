import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private http: HttpClient){}
  categories:any;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }
}