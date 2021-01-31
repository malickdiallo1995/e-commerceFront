import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicePaymentService} from '../../../shared/services/service-payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass']
})
export class PaymentSuccessComponent implements OnInit {
  transactionId : String;
  constructor(private route: ActivatedRoute,private servicePayment:ServicePaymentService) { }

  ngOnInit(): void {
    console.log('*********** Get Transaction ID success ************')
    this.transactionId =  this.route.snapshot.queryParamMap.get('transaction_id')
    console.log('*********** Transaction ID [',this.transactionId);
    this.servicePayment.payment(this.transactionId,'SUCCESS');
  }
}
