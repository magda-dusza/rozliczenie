import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  actions = [];
  constructor(private http: HttpClient){}
  historyData:any;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/actions').subscribe(data => {
      this.splitToCategories(data);
    });
  }

  displayHeaders = ['Bank', 'Data transakcji', 'Opis', 'Kwota', 'Kategoria'];
  lists = {};
  categories = [];
  
  splitToCategories(data) {
    data.forEach(action=>{
      if(!this.lists[action.category]){
        this.lists[action.category] = [];
        this.categories.push(action.category);
      }
      this.lists[action.category].push(action);
    });
  }

  suma(category){
    let sum = 0;
    this.lists[category].forEach(action=>{
      sum += action.amount;
    });
    return sum.toFixed(2);
  }


}