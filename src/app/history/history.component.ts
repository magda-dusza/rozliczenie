import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';

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

  export() {
    let text = this.prepareText();
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "rozlicznie.csv");
  }

  prepareText() {
    let firstLine = this.displayHeaders.join(',');
    let row = [];
    for(let i=0;i<this.categories.length;i++){
      if(this.lists[this.categories[i]].length > 0){
        this.lists[this.categories[i]].forEach((elem)=>{
          row.push([elem.bank, elem.date, elem.description, elem.amount, elem.category]);
        });
      }
    }
    let data = row.join('\n');
    return firstLine.concat('\n', data);
  }

}