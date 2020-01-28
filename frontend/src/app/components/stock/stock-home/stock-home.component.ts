import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray = [11, 22, 33, 44, 55, 66];
  mTextSearch = new Subject<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.mTextSearch.pipe(
      debounceTime(2000)
    ).subscribe(keyword => this.search(keyword));
  }

  search(keyword: string): void {
    console.log(keyword);
  }

  outofStock() {
    return 112;
  }

  onClickDelete(id: string) {
    // modal confirm
  }

  onClickEdit(id: string) {
    this.router.navigate([`/stock/edit/${id}`]); // `
  }

}
