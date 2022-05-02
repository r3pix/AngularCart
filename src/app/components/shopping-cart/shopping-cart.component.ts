import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Product } from 'src/app/models/product';
import { OrderComponent } from './order/order.component';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { Order } from 'src/app/models/order';
import { IteratorModel } from 'src/app/models/iterator.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  productList: Product[] = [];
  productMap: Map<string,number> = new Map();

  productArray: IteratorModel[] =[];

  ngOnInit() {
  }

  addItem(event: any){
    //console.log(event);
    this.productList.push(event);
    //this.calculateMap(event);
    this.calculateArray(event);
  }

  calculateArray(event: any){
    let element = this.productArray.findIndex(x=>x.id === event.id);
    if(element!==-1){
      console.log(element);
      this.productArray[element].quantity = this.productArray[element].quantity +1;
    }
    else{
      this.productArray.push(new IteratorModel(event.id,1,event.name,event.price));
    }
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

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '500px',
       data: {productList: this.productList, productArray: this.productArray},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  onDelete(event: any){
    let element = this.productArray.findIndex(x=>x.id == event);
    this.productArray.splice(element,1); //usuwanie z mapy
    let i:number;
    //let indexesToRemove: number[] = [];
    for(i=this.productList.length-1; i>=0; i--){ //od konca tak zeby nie zmniejszac tablicy, jak zmniejszasz tablice to pomijasz niektore elementy bo inkrementujesz a indeksy sie zmniejszaja
      if(this.productList[i].id === event){
        this.productList.splice(i,1);
       // console.log(i);
        //indexesToRemove.push(i);
      }
    }

    console.log(this.productArray);
    console.log(this.productList);
  }
  
}


