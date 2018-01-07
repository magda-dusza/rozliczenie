import { Injectable } from '@angular/core';

@Injectable()
export class DataProcessor {
  constructor() {
  }

  processIngData(allText) : void {
    // split content based on new line
    let result = [];
    var firstColumn = allText.indexOf('Data transakcji');
    var validText = allText.substring(firstColumn, allText.length);
    var lines = validText.split(';;;;\n');

    result[0] = lines[0].split(';');
    result[0].push('Kategoria');

    for(let i=1;i<lines.length;i++){
        result[i] = lines[i].split(';');
    }

}

processMilleniumData(allText) : void {
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
        }
    }
}