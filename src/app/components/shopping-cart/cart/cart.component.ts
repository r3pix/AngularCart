import { Component, Input, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cartItems: Product[];

  @Input() map: Map<string,number>;

  //cartTotal = 0

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.handleSubscription();
   // this.loadCartItems();
    //this.calcCartTotal(); 
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
    console.log(this.map);
  }
}
