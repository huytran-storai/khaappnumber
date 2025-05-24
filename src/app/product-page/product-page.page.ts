import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  flashLabel: boolean = false;
  inputNumbers: string = '';
  convertedNumbersArray: string[] = [];
  inputValue: string = '';  // Chuỗi input từ người dùng
  storedSequence: string = '';  // Chuỗi lưu trong local storage
  suggestions: Array<{ sequence: string, count: number }> = [];  // Kết quả gợi ý
  mostFrequentSequence: string = '';  // Số xuất hiện nhiều nhất
  lastSubmitTime: string = '';

  constructor() {
    this.loadStoredSequence();
    const savedTime = localStorage.getItem('lastSubmitTime');
    if (savedTime) {
      this.lastSubmitTime = savedTime;  // Hiển thị thời gian từ Local Storage
    }
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
  // Hàm định dạng ngày giờ
  formatDateTime(date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);  // Tháng tính từ 0 nên cần +1
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  }

  // Hàm thêm số 0 vào trước những số có 1 chữ số
  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
  onSubmit() {
    if (this.inputValue) {
      this.storedSequence += this.inputValue;  // Thêm chuỗi vừa nhập vào dãy đã lưu
      this.saveToLocalStorage();
      this.inputValue = '';  // Reset input sau khi submit
      const now = new Date();
      this.lastSubmitTime = this.formatDateTime(now);
      localStorage.setItem('lastSubmitTime', this.lastSubmitTime);
      this.loadStoredSequence();
    }
  }

  removeCache() {
   localStorage.removeItem('storedSequence');
    this.storedSequence = "";
  }

  saveToLocalStorage() {
    localStorage.setItem('storedSequence', this.storedSequence);
  }

  loadStoredSequence() {
    const savedSequence = localStorage.getItem('storedSequence');
    if (savedSequence) {
      this.storedSequence = savedSequence;
      this.generateSuggestions();
    }
  }

  generateSuggestions() {
    const inputLength = this.inputValue.length;
    const sequence = this.storedSequence;
    const matches: any = {};

    // Tìm kiếm các chuỗi con trùng khớp và chuỗi theo sau
    for (let i = 0; i < sequence.length - inputLength; i++) {
      const subSequence = sequence.substring(i, i + inputLength);
      const nextSequence = sequence.substring(i + inputLength, i + inputLength + 4);  // Lấy 5 số tiếp theo

      if (subSequence === this.inputValue && nextSequence.length === 4) {
        if (!matches[nextSequence]) {
          matches[nextSequence] = 1;
        } else {
          matches[nextSequence]++;
        }
      }
    }

    // Định dạng kết quả gợi ý
    this.suggestions = Object.keys(matches).map(seq => ({
      sequence: seq,
      count: matches[seq]
    }));

    // Tìm số xuất hiện nhiều nhất
    if (this.suggestions.length > 0) {
      this.suggestions.sort((a, b) => b.count - a.count);
      this.mostFrequentSequence = this.suggestions[0].sequence;
    } else {
      this.mostFrequentSequence = '';
    }
  }

}
