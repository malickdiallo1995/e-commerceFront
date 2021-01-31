import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commande} from '../../../modals/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private url = environment.base_url+'/commandes/';
  constructor(private httpClient: HttpClient) {
  }

  public addCommande(commande: Commande):Observable<Commande>{
    return this.httpClient.post(this.url+"create", commande);
  }

  public getCommandes(): Observable<Commande[]>{
    return this.httpClient.get<Commande[]>(this.url);
  }

  public getCommandeById(id: number): Observable<Commande[]> {
    return this.httpClient.get<Commande[]>(this.url+'commandes/'+id);
  }
}
