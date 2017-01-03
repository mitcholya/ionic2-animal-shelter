import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser} from 'ionic-native';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PaymentService } from '../../shared/services/payment.service'; 


@Component({
    templateUrl: 'pets.html'
})

export class PetsPage {

  paymentYandexForm: FormGroup;
  // receiver: AbstractControl;
  // formcomment: AbstractControl;
  //short-dest: AbstractControl;
  //label: AbstractControl;
  // quickpay_form: AbstractControl;
  // targets: AbstractControl;
  // sum: AbstractControl;
  // comment: AbstractControl;
  // need_fio: AbstractControl;
  // need_email: AbstractControl;
  // need_phone: AbstractControl;
  // need_address: AbstractControl;
  // paymentType: AbstractControl;

  
    constructor(
      private fb: FormBuilder,
      private payment: PaymentService

    ) {
      this.paymentYandexForm = this.fb.group({
        'receiver': [410014833098614, Validators.required],
        'formcomment': ['Питомцам'],
        'short_dest': ['Питомцам'],
        'label': ['$order_id'],
        'quickpay_form': ['donate'],
        'targets': ['Питомцам'],
        'sum': ['150', Validators.compose([Validators.required, Validators.minLength(2)]) ],
        'comment': ['Питомцам'],
        'need-fio': [true],
        'need-email': [true],
        'need-phone': [false],
        'need-address': [false],
        'paymentType': ['', Validators.required]
      }); 
    }

    ionViewDidLoad() {
        // this.startListening();
 
      
      //this.receiver = this.paymentYandexForm.controls['receiver'];
    }

  openUrl(url) {
    let browser = new InAppBrowser(url, '_blank');
    //let browser = window.open(url);
  }



  onSubmit(form) {
    //console.log(form.value);
    if (form.valid){
        console.log(form.value);
        this.payment.sendData(form.value)
            .subscribe((data) => {
                console.log(data.url);
                  this.openUrl(data.url);
               });
       
      };
  }

}