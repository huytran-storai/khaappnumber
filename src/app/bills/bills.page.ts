import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  flashLabel: boolean = false;
  inputNumbers: string = '';
  convertedNumbersArray: string[] = [];
  inputValue: string = '';  // Chuỗi input từ người dùng
  storedSequence: string = '';  // Chuỗi lưu trong local storage
  suggestions: Array<{ sequence: string, count: number }> = [];  // Kết quả gợi ý
  mostFrequentSequence: string = '';  // Số xuất hiện nhiều nhất
  lastSubmitTime: string = '';

  constructor() {
    const savedTime = localStorage.getItem('lastSubmitTime');
    if (savedTime) {
      this.lastSubmitTime = savedTime;  // Hiển thị thời gian từ Local Storage
    }
  }

  ngOnInit() {
    this.flashLabel = true;
    this.loadStoredSequence();
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
      if (this.storedSequence) {
        this.storedSequence += '-' + this.inputValue;

      } else {
        this.storedSequence = this.inputValue;
      }
      this.saveToLocalStorage();

      this.inputValue = '';
      const now = new Date();
      this.lastSubmitTime = this.formatDateTime(now);
      localStorage.setItem('lastSubmitTime', this.lastSubmitTime);
      this.loadStoredSequence();
    }
  }

  removeCache() {
    localStorage.removeItem('storedSequence2');
    this.storedSequence = "";
  }

  saveToLocalStorage() {
    localStorage.setItem('storedSequence2', this.storedSequence);
  }

  loadStoredSequence() {
    const savedSequence = localStorage.getItem('storedSequence2');
    if (savedSequence) {
      this.storedSequence = savedSequence;
      this.generateSuggestions();
    }
  }

  generateSuggestions() {
    const input = this.inputValue;
    const sequenceParts = this.storedSequence.split('-');
    const matches: any = {};

    for (let i = 0; i < sequenceParts.length; i++) {
      const part = sequenceParts[i];
      const nextPart = sequenceParts[i + 1];  // Lượt sau

      if (part.endsWith(input) && nextPart) {
        // Lấy tối đa 3 chữ số đầu tiên của lượt sau
        const predicted = nextPart.substring(0, 3);
        if (!matches[predicted]) {
          matches[predicted] = 1;
        } else {
          matches[predicted]++;
        }
      }
    }

    this.suggestions = Object.keys(matches).map(seq => ({
      sequence: seq,
      count: matches[seq],
    }));

    if (this.suggestions.length > 0) {
      this.suggestions.sort((a, b) => b.count - a.count);
      this.mostFrequentSequence = this.suggestions[0].sequence;
    } else {
      this.mostFrequentSequence = '';
    }
  }
  
  removeLastEntry() {
    const parts = this.storedSequence.split('-');

    if (parts.length > 1) {
      parts.pop(); 
      this.storedSequence = parts.join('-');
    } else {
      this.storedSequence = '';
    }

    this.saveToLocalStorage();        
    this.loadStoredSequence();      
  }

}
