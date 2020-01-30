import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { NetworkService } from 'src/app/services/network.service';
import { ProductResult } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray: ProductResult[] = [];
  mSearchArray: ProductResult[] = [];

  mTextSearch = new Subject<string>();

  constructor(private router: Router, private networkService: NetworkService, private authService: AuthService) { }

  ngOnInit() {
    this.mTextSearch.pipe(
      debounceTime(1000)
    ).subscribe(keyword => this.search(keyword));

    this.feedData();
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      result => {
        var items = result.result as ProductResult[];
        this.mDataArray = items
        this.mSearchArray = items
      }, error => {
        Swal.fire(error.error.message)
        // alert(error.error.message)
      }
    )
  }

  search(keyword: string): void {
    if (!keyword) {
      return this.feedData();
    }
    this.mDataArray = this.mSearchArray.filter(item => {
      return item.name.toLowerCase().includes(keyword.toLowerCase())
    })
  }

  outofStock(): number {
    return this.mDataArray.filter(item => {
      return item.stock <= 0;
    }).length
  }

  onClickDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.networkService.deleteProductById(id).subscribe(
          result => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.feedData();
          }, error => {
            Swal.fire(error.error.message);
          }
        )
      }
    })
  }

  onClickEdit(id: string) {
    this.router.navigate([`/stock/edit/${id}`]); // `
    this.networkService.getProductById(id).subscribe(
      result => {

      }, error => {
        Swal.fire(error.error.message)
      }
    )

  }

}
