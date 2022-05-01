export class IteratorModel{
    id: string;
    name: string;
    quantity: number;
    price:number;

    constructor(id:string, quantity:number, name:string, price: number){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}