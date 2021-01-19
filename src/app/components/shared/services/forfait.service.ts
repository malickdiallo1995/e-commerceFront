import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forfait } from 'src/app/modals/forfait.model';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForfaitService {

  private url = environment.base_url+'/forfaits/';
    constructor(private httpClient: HttpClient) {
  }

  public getForfaits(): Observable<Forfait[]>{
    return this.httpClient.get<Forfait[]>(this.url);
  }

  public getForfaitByIdTelephone(idTelephone: number): Observable<Forfait[]> {
    return this.httpClient.get<Forfait[]>(this.url+'telephone/'+idTelephone);
  }
}
