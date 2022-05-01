import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { IteratorModel } from 'src/app/models/iterator.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  @Input() cartItems: Product[];


  @Input() array: IteratorModel[];
  @Output() openDialog = new EventEmitter<boolean>();
  

  @Output() deleteEvent = new EventEmitter<string>();

  productMap: Map<string,number> = new Map<string,number>();

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private authService:  AuthService
  ) { }

  

  ngOnInit() {
    //this.handleSubscription();
   // this.loadCartItems();
    //this.calcCartTotal(); 
   // this.calculateMap();
    //console.log(this.map.entries());
    console.log(this.array);
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
    })
  }

  getItem(elementId: any){
    return this.cartItems.find(x=> x.id == elementId);
  }

  loadCartItems() {
    // this.cartService.getCartItems().subscribe((items: CartItem[]) => {
    //   this.cartItems = items;
    //   this.calcCartTotal();
    // })
    console.log(this.cartItems);
  }

  get calcCartTotal() {
    let cartTotal = 0
    this.cartItems.forEach(item => {
     cartTotal += item.price;
    })
    return cartTotal;
  }

  show(){
    console.log(this.cartItems);
    //console.log(this.map);
  }

  openDialogg(){
    this.openDialog.emit(true);
  }

  // getQuantity(id: any){
  //   /return this.map.get(id);
  // }

  onDelete(event: any){
    this.deleteEvent.emit(event);
  }

  calculateMap(){
    this.cartItems.forEach(element => {
      if(this.productMap.has(element.id)){
        let value = this.productMap.get(element.id);
        this.productMap.set(element.id,value+1);
      }
      else{
        this.productMap.set(element.id,1);
      }
    });
  }

}
