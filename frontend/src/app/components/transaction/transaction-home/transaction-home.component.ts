import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { TransactionResponse } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transaction-home',
  templateUrl: './transaction-home.component.html',
  styleUrls: ['./transaction-home.component.css']
})
export class TransactionHomeComponent implements OnInit {

  mDataArray: TransactionResponse[]

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();
  }

  async feedData() {
    // this.networkService.getProductAll().subscribe(
    //   result => {
    //     var items = result.result as ProductResult[];
    //     this.mDataArray = items.map(item => {
    //       item.image = this.networkService.getImage(item.image);
    //       return item;
    //     })
    //     this.mSearchArray = this.mDataArray
    //   }, error => {
    //     Swal.fire(error.error.message)
    //     // alert(error.error.message)
    //   }
    // )

    let result = await this.networkService.getTransaction().toPromise()
    this.mDataArray = result
  }

}
