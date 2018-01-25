import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import {CategoryDialogComponent} from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './newFile.component.html',
  styleUrls: ['./newFile.component.css']
})
export class NewFileComponent {
  constructor(private http: HttpClient, public dialog: MatDialog){
  }
  dialogRef: MatDialogRef<CategoryDialogComponent>;

  file: any = {name: 'Brak'};
  headers = [,'Id', 'Numer rachunku', 'Data transakcji', 'Rodzaj transakcji', 'Nr konta', 'Odbiorca', 'Opis', 'Kwota', 'Bank', 'Kategoria'];
  displayHeaders = ['Bank', 'Data transakcji', 'Opis', 'Kwota', 'Kategoria'];
  
  
  fileChanged($event):void {
		this.file = (<HTMLInputElement>document.getElementById("file-upload")).files[0];

		var fileReader = new FileReader();
		fileReader.readAsText(this.file, 'windows-1250');
		fileReader.onload = (e:any) => {
      let fileName = this.file.name;
      if(fileName.indexOf('Lista')>-1){
        this.processData(e.target.result);
      } else if(fileName.indexOf('Historia')>-1){
        this.processMillenium(e.target.result);
      }
    }
  }

  categories:any = [];

  lists = {};

  openDialog(category){
    console.log('open dialog', category);
    this.dialogRef = this.dialog.open(CategoryDialogComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
      for(let i=0;i<this.categories.length;i++){
        this.lists[this.categories[i].name] = [];
      }
    });
    }

  allData = [];

  reload(): void{
    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = this.allData.filter((arr, index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }

  newRow = {
    bank: 'ING',
    date: new Date().toISOString().slice(0,10).replace(/-/g,"-"),
    amount: 0,
    desc: 'test',
    category: ''
  }

  addRow(list, model): void {
    list.push([model.bank, model.date, model.desc, model.amount, model.category]);
  } 

	processData(allText) : void {
		// split content based on new line
    var firstColumn = allText.indexOf('Data transakcji');
    var validText = allText.substring(firstColumn, allText.length);
    var lines = validText.split(';;;;\n');
    let currentLength = this.allData.length;
    for(let i=1;i<lines.length;i++){
         var line = lines[i].split(';');
         this.allData[currentLength+i] = [];
         this.allData[currentLength+i].push('ING');
         this.allData[currentLength+i].push(line[0]);
         this.allData[currentLength+i].push(line[3]); 
         this.allData[currentLength+i].push(line[8]);//line(10)
        if(this.allData[currentLength+i] && this.allData[currentLength+i][2]){
          let category = this.findCategory(this.allData[currentLength+i][2], this.allData[currentLength+i][3]);
          this.allData[currentLength+i].push(category);
        }
    }

    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = this.allData.filter((arr, index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }
  
  processMillenium(allText) : void {
    var validText = allText.substring(0, allText.length);
    var lines = validText.split('\n');
    var currentLength = this.allData.length;
    for(let i=1;i<lines.length;i++){
        let pos = currentLength + i;
        var line = lines[pos].split(',');
        this.allData[pos] = [];
        this.allData[pos].push('Millenium');
        this.allData[pos].push(line[1]);
        if(line.length===10){
          this.allData[pos].push(line[5]); 
          this.allData[pos].push(line[6] );//|| line[8]
        }else {
          this.allData[pos].push(line[6]); 
          this.allData[pos].push(line[7] );//|| line[8]
        }
        
        if(this.allData[pos] && this.allData[pos][2]){
          let category = this.findCategory(this.allData[pos][2], '');
          this.allData[pos].push(category);
        }
    }

    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = this.allData.filter((arr,index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }

  findCategory(desc, additional) : string {
    for(let i=0; i<this.categories.length;i++){
      for(let j=0; j<this.categories[i].keyWords.length;j++){
        if(desc.toLowerCase().indexOf(this.categories[i].keyWords[j].toLowerCase())>-1){
          return this.categories[i].label;
        };
        if(additional.toLowerCase().indexOf(this.categories[i].keyWords[j].toLowerCase())>-1){
          return this.categories[i].label;
        };
      }
    }
    return 'Pozostale';
  }

  saveRecords() : void {
    let request = [];
    for(let i=0;i<this.categories.length;i++){
      if(this.lists[this.categories[i].name].length > 0){
        this.lists[this.categories[i].name].forEach((elem)=>{
          let number = elem[3];
          if(elem[3].replace){
            number = Number(elem[3].replace(/\"/g, ""));
          }
          let model = {
            bank : elem[0],
            date : elem[1],
            description: elem[2],
            amount: number,
            category: elem[4]
          }
          this.http.post("http://localhost:3000/actions", model).subscribe(
            (val) => { console.log("POST call successful value returned in body", val); },
            response => {console.log("POST call in error", response); },
            () => { console.log("The POST observable is now completed."); });
        });
      }
    }
  }
}