import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = '/assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){
  }

	file: any = null;
  
	fileChanged($event):void {
		this.file = (<HTMLInputElement>document.getElementById("file")).files[0];

		var fileReader = new FileReader();
		fileReader.readAsText(this.file, 'windows-1250');
		fileReader.onload = (e) => {
      let fileName = this.file.name;
      if(fileName.indexOf('Lista')>-1){
        this.processData(e.target.result);
      } else if(fileName.indexOf('Historia')>-1){
        this.processMillenium(e.target.result);
      }
    }
  }

  categories = [
    {name:'dochody', label: 'Dochody', keyWords: ['wynagrodzenie', 'naliczone odsetki', 'place', 'rozlicznie pracownika', 'Skanska', 'Sii']},
    {name:'stale', label: 'Oplaty stale', keyWords: ['Orange', 'NETIA', 'T-Mobile', 'assistance']},
    {name:'jedzenie', label: 'Jedzenie', keyWords: ['tesco','CUKIERNIA', 'Carrefour', 'DELIKOMAT', 'SPOLEM', 'delikatesy', 'biedronka', 'piekarnia', 'freshmarket', 'market', 'bulka z maslem', '1-minute']},
    {name:'rozrywka', label: 'Rozrywka', keyWords: ['Stacja Grawitacja', 'kino', 'wisla', 'wspinacz','crux']},
    {name:'restauracja', label: 'Restauracja', keyWords: ['Restauracja', 'food', 'kfc', 'kawiarnia', 'pizza','bar ', 'subway', 'pijalnie']},
    {name:'prezenty', label: 'Prezenty', keyWords: ['groupon']},
    {name:'kosmetyki', label: 'Kosmetyki', keyWords: ['rossman', 'hebe']},
    {name:'domowe', label: 'Domowe', keyWords: ['leroy']},
    {name:'ubrania', label: 'Ubrania', keyWords: ['ccc']},
    {name:'wewnetrzne', label: 'Wewnetrzne', keyWords: ['oszczedności', 'Przelew własny']},
    {name:'pozostale', label: 'Pozostale', keyWords: []},
  ];

  lists = {};

  ngOnInit(): void {
      for(let i=0;i<this.categories.length;i++){
        this.lists[this.categories[i].name] = [];
      }
    }

  allData = [];

  reload(): void{
    console.log('reload');
    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = this.allData.filter((arr, index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }

  newRow = {
    price: 0,
    description: 'test'
  }

  addRow(list, model): void {
    list.push([model.price, model.description]);
  } 

	processData(allText) : void {
		// split content based on new line
    this.allData = [];
    var firstColumn = allText.indexOf('Data transakcji');
    var validText = allText.substring(firstColumn, allText.length);
    var lines = validText.split(';;;;\n');

    this.allData[0] = lines[0].split(';');
    this.allData[0].push('Kategoria');

    for(let i=1;i<lines.length;i++){
        this.allData[i] = lines[i].split(';');
        if(this.allData[i] && this.allData[i][2]){
          let category = this.findCategory(this.allData[i][2], this.allData[i][3]);
          this.allData[i].push(category);
        }
    }

    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = this.allData.filter((arr, index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }
  
  processMillenium(allText) : void {
    let result = [];
    var validText = allText.substring(0, allText.length);
    var lines = validText.split('\n');

    result[0] = lines[0].split(',');

    result[0].push('Kategoria');

    for(let i=1;i<lines.length;i++){
        result[i] = lines[i].split(',');
        if(result[i].length === 10) {
          result[i] = [...result[i].slice(0,3),'', ...result[i].slice(3,result[i].length)];
        }
        if(result[i] && result[i][6]){
          let desc = result[i][6];
          let category = this.findCategory(desc, '');
          result[i] = [...result[i], category];
        }
    }

    for(let i=0;i<this.categories.length;i++){
      this.lists[this.categories[i].name] = result.filter((arr,index) => {
        return arr[arr.length-1]===this.categories[i].label || index===0;
      });
    }
  }

  findCategory(desc, additional) : string {
    console.log(desc);
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
};







