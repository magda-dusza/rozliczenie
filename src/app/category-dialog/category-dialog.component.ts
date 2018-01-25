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
  category = {
    _id: '',
    name: '',
    keyWords: [],
    label: ''
  };
  newWord:any;
  newCategoryLabel: any;
  newModel = {
    label: 'Nowa',
    name: 'nowa',
    keyWords: []
  }
  message:any;
  errorMessage:any;

  ngOnInit(): void {
    this.http.get('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
      this.category = this.categories[0];
    });
  }

  addWord() {
    this.category.keyWords.unshift(this.newWord);
  }

  saveModel() {
    this.http.put('http://localhost:3000/categories/'+this.category._id, this.category)
    .subscribe(
      res => { this.message = 'Suckes! Kategoria uaktualniona' },
      res => { this.errorMessage = 'Blad! Coś poszło nie tak' }
    );
  }

  createModel() {
    let newCat = {
      label: this.newCategoryLabel,
      name: this.toSnakeCase(this.newCategoryLabel),
      keyWords: this.category.keyWords 
    }
    this.http.post('http://localhost:3000/categories', newCat)
    .subscribe(
      res => { this.message = 'Suckes! Kategoria dodana' },
      res => { this.errorMessage = 'Blad! Coś poszło nie tak' }
    );
  }

  toSnakeCase(name) {
    let words = name.split(' ');
    words.forEach(word=>{word = word.toLowerCase()});
    return words.join('_');
  }

}