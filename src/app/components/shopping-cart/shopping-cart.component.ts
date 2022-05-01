import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }

  productList: Product[] = [];
  productMap: Map<string,number> = new Map();

  ngOnInit() {
  }

  addItem(event: any){
    //console.log(event);
    this.productList.push(event);
    this.calculateMap(event);
  }

  calculateMap(event: any){
    if(this.productMap.has(event.id)){
      let value = this.productMap.get(event.id);
      this.productMap.set(event.id,value+1);
    }
    else{
      this.productMap.set(event.id,1);
    }
  }

}
