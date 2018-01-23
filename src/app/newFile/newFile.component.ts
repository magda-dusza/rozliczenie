import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './newFile.component.html',
  styleUrls: ['./newFile.component.css']
})
export class NewFileComponent {
  constructor(){
  }

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
}