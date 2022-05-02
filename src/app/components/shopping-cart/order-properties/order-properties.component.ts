import { Component, Inject, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { IteratorModel } from 'src/app/models/iterator.model';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.css']
})
export class OrderPropertiesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{order: any}) { }

    parsedProducts: Product[] = [];
    productArray: IteratorModel[] =[];

  ngOnInit(): void {
    this.parsedProducts = JSON.parse(this.data.order.products);
    this.calculateArray();
  }

  calculateArray(){
    let i:number;
    for(i=0; i<this.parsedProducts.length; i++){
      let element = this.productArray.findIndex(x=>x.id === this.parsedProducts[i].id);
      if(element!==-1){
        console.log(element);
        this.productArray[element].quantity = this.productArray[element].quantity +1;
      }
      else{
        this.productArray.push(new IteratorModel(this.parsedProducts[i].id,1,this.parsedProducts[i].name,this.parsedProducts[i].price));
      }
    }
  }

  get calcCartTotal () {
    let cartTotal = 0
    this.parsedProducts.forEach(item => {
     cartTotal += item.price;
    })
    return cartTotal;
  }
  
}
