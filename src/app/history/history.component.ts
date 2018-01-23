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
      this.historyData = data;
    });
  }
  
  displayHistoryHeaders = ['Bank', 'Data transakcji', 'Opis', 'Kwota', 'Kategoria'];

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


}