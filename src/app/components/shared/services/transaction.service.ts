import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Transaction} from '../../../modals/transaction.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = environment.base_url+'/reglements/transaction/';

  constructor(private httpClient: HttpClient) {

  }

  public getTransactions():Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(this.url);
  }

  public getTrannsactionById(id: number):Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(this.url+""+id);
  }


  public addTransaction(transactionJson: any):Observable<Transaction>{
    return this.httpClient.post(this.url+"create/bis", transactionJson);
  }
}
