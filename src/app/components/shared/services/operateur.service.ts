import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operateur } from 'src/app/modals/operateur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperateurService {

  private url = environment.base_url+'/operateurs/';

  constructor(private httpClient: HttpClient) {

  }

  public getOperateurs():Observable<Operateur[]>{
    return this.httpClient.get<Operateur[]>(this.url);
  }
}
