import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {
  constructor(private http: HttpClient){}
  categories:any;
  category:any;
  name:String;
  keyWords:any;
  newWord:any;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
      this.category = this.categories[0];
      this.updateModel();
    });
  }

  updateModel() {
    this.name = this.category.name;
    this.keyWords = this.category.keyWords;
  }

  addWord() {
    this.category.keyWords.push(this.newWord);
  }

  saveModel() {
    this.http.put('http://localhost:3000/categories/'+this.category._id, this.category).subscribe(res => {
      console.log(res);
    });
  }

}