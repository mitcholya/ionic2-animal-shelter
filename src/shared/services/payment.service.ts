import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PaymentService {

    constructor(
        public http: Http
        ) {

    }

    public sendData(data): Observable<any> {
        let urlSearchParams = new URLSearchParams();
    //  let body = new FormData();
         urlSearchParams.append('receiver', data.receiver);


         urlSearchParams.append('formcomment', data.formcomment);
         urlSearchParams.append('short-dest', data.short_dest);


         urlSearchParams.append('quickpay-form', data.quickpay_form);
         urlSearchParams.append('targets', data.targets);
         urlSearchParams.append('paymentType', data.paymentType);
         urlSearchParams.append('sum', data.sum);


        // body.append('receiver', data.receiver);
        // body.append('receiver', data.receiver);
    //let body = data;
    //let body =JSON.stringify(data);
    let body = urlSearchParams.toString();
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers});

    return this.http.post('https://money.yandex.ru/quickpay/confirm.xml', body, options);
  }
}