import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicePaymentService {
  private  url = environment.base_url+'/reglements/transaction/check_update'
  constructor(private httpClient: HttpClient) { }

  /**
   *
   * @param transaction_id
   * @param state
   */
  public payment (transaction_id, state ){
    console.log("IN TRANSACTION SERVICE");
    return this.httpClient.get(this.url + "?transaction_id="+transaction_id+"&&state="+state).subscribe((response) => {

    });
  }
}
