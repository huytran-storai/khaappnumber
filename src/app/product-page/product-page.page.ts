import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage  implements OnInit{
  flashLabel: boolean = false;
  inputNumbers: string = '';
  convertedNumbersArray: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.flashLabel = true;
  }
  exportToPDF() {
    const labelValue = (document.getElementById('dataLabel') as HTMLIonLabelElement).innerText;
    const doc = new jsPDF();
    doc.text(labelValue || '', 10, 10);
    doc.save('document.pdf');
  }
  convertNumbers() {

  }

  clearInput() {
    // Xóa nội dung trong ô input và mảng convertedNumbersArray
    this.inputNumbers = '';
    this.convertedNumbersArray = [];
  }

  autoConvertNumbers() {
    // Gọi hàm chuyển đổi khi có bất kỳ thay đổi nào trong ô input
    this.convertNumbers();
  }
}
