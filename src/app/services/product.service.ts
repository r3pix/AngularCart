import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { productsUrl } from 'src/app/config/api';

import { Product } from 'src/app/models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] =[];

  constructor(private afs: AngularFirestore) { 
    //this.products = this.afs.collection('products').valueChanges();
  }

  getProducts() {
    let collection = this.afs.firestore.collection('products');

    collection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        //console.log(doc.id, '=>', doc.data());
        this.products.push(new Product(doc.id, doc.data().name,doc.data().description, parseFloat(doc.data().price), doc.data().imageUrl));
      })
    });
    //console.log(this.products);

    return this.products;
  }
  
  saveProduct(product: Product){
    this.afs.collection('products').add({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl
    });
  }


}
