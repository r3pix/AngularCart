import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  orders: Order[] =[];
  constructor(private afs: AngularFirestore) { }

getObservableOrders(){
  return this.afs.collection('orders').valueChanges();
}

  getOrders() {
    let collection = this.afs.firestore.collection('orders');

    collection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        this.orders.push(new Order(doc.id, doc.data().city,doc.data().name,doc.data().number,
        doc.data().postalCode, JSON.parse(doc.data().products),doc.data().street,
        doc.data().total,doc.data().uid));
      })
    });
    return this.orders;
  }


  saveOrder(order: Order){
    this.afs.collection('orders').add({
      name: order.name,
      city: order.city,
      number: order.number,
      postalCode: order.postalCode,
      products: JSON.stringify(order.products),
      street: order.street,
      total: order.total,
      uid: order.uid
    });
  }
}
