import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputNumbers: string = '';
  convertedNumbersArray: string[] = [];

  constructor(private toastController: ToastController) {}

  convertNumbers() {
    // Sử dụng regex để lấy ra các con số từ dãy nhập vào
    const numbersArray = this.inputNumbers.match(/\d+/g);

    if (numbersArray) {
      // Gán mảng số vào biến convertedNumbersArray để hiển thị trong bảng
      this.convertedNumbersArray = numbersArray;
    } else {
      this.convertedNumbersArray = [];
    }
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

  copyToClipboard(number: string) {
    // Sao chép số vào clipboard sử dụng document.execCommand
    const textarea = document.createElement('textarea');
    textarea.value = number;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.presentCopyToast(number);
  }

  copyAllToClipboard() {
    // Sao chép tất cả các số vào clipboard sử dụng document.execCommand
    const allNumbers = this.convertedNumbersArray.join('\n');
    const textarea = document.createElement('textarea');
    textarea.value = allNumbers;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.presentCopyToast('Tất cả số');
  }

  async presentCopyToast(text: string) {
    const toast = await this.toastController.create({
      message: `Đã sao chép: ${text}`,
      duration: 2000,
      position: 'bottom',
      color: 'success' // optional: you can customize the color
    });

    toast.present();
  }

}
