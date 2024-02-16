import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputNumbers: string = '';
  convertedNumbersArray: any[] | undefined;
  constructor() {}
  convertNumbers() {
    const numbersArray = this.inputNumbers.match(/\d+/g);
  
    if (numbersArray) {
      this.convertedNumbersArray = numbersArray;
    } else {
      this.convertedNumbersArray = [];
    }
  }
}
