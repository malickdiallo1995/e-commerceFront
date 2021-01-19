import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marque } from 'src/app/modals/marque.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  private url = environment.base_url+'/marques/';

  constructor(private httpClient: HttpClient) { 

  }

  public getMarques():Observable<Marque[]>{
      return this.httpClient.get<Marque[]>(this.url);
  } 
}
