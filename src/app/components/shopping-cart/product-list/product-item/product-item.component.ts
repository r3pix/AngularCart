import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service'
import { CartService } from 'src/app/services/cart.service'
import { WishlistService } from 'src/app/services/wishlist.service';
import { EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PropertiesComponent } from '../../properties/properties.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;
  @Output() addItemEvent = new EventEmitter<Product>();

  @Input() addedToWishlist: boolean;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  handleAddToCart() {
    // this.cartService.addProductToCart(this.productItem).subscribe(() => {
    //   this.msg.sendMsg(this.productItem)
    // }) poprawic ez
    //console.log(this.productItem);
    this.addItemEvent.emit(this.productItem);
  }

  handleAddToWishlist() {
    this.wishlistService.addToWishlist(this.productItem.id).subscribe(() => {
      this.addedToWishlist = true;
    })
  }

  handleRemoveFromWishlist() {
    this.wishlistService.removeFromWishlist(this.productItem.id).subscribe(() => {
      this.addedToWishlist = false;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: '600px',
       data: {product: this.productItem},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }
}
