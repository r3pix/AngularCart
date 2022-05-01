import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  file: File;
  fileAdded: boolean;
  downloadableURL = '';   

  constructor(public builder: FormBuilder, private af:  AngularFireStorage, private productService: ProductService, private router: Router) { }
  registerForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    console.log(localStorage.getItem('isAdmin'));
    console.log(localStorage.getItem('uid'));
  }

  task: AngularFireUploadTask;   

  buildForm() {
    this.registerForm = this.builder.group({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })
  }

  upload($event){
    this.file = $event.target.files[0];
    this.fileAdded = true;
  }

  async addProduct(){
    this.task = this.af.upload("/files"+this.file.name, this.file);
    (await this.task).ref.getDownloadURL().then(url => {
      this.productService.saveProduct(new Product("",this.registerForm.get('name').value, this.registerForm.get('description').value,this.registerForm.get('price').value,url));
      this.router.navigate(['/shop']);
    });
  }

  check(){
    if(!this.registerForm.valid || !this.fileAdded){
      return true;
    }
    return false;
  }
}
