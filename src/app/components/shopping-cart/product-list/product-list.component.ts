import { Component, OnInit, Output } from '@angular/core';

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';
import { WishlistService } from 'src/app/services/wishlist.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  productList: Product[] = []
  wishlist: number[] = []

  @Output() addItemEvent = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    this.loadProducts();
   // this.loadWishlist();
   //console.log(this.products);
   //console.log(this.productList);
  }

  loadProducts() {
   /* this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    })*/
    this.productList = this.productService.getProducts();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(productIds => {
      this.wishlist = productIds
    })
  }

  addItem(event: any){
    //console.log(event);
    this.addItemEvent.emit(event);
  }

}
