import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicePaymentService} from '../../../shared/services/service-payment.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.sass']
})
export class PaymentFailureComponent implements OnInit {
  transactionId : string;
  private  url = environment.base_url+'/api/reglements/transaction/check_update'

  constructor(private route: ActivatedRoute,private servicePayment:ServicePaymentService) { }

  ngOnInit(): void {
    console.log("*********** Get Transaction ID Failure ************")
    this.transactionId =  this.route.snapshot.queryParamMap.get("transaction_id")
    console.log("*********** Transaction ID [",this.transactionId);
    /**
     * Appel service call back
     */
    this.servicePayment.payment(this.transactionId,'FAILURE');
  }

}
