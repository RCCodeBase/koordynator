import { Component, OnInit,ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  scannerEnabled = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.router.navigate([resultString]);
    this.scannerEnabled = false;
}

}
