import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LigneCommande} from '../../../modals/ligneCommande.model';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {

  private url = environment.base_url+'/ligneCommandes/';
  constructor(private httpClient: HttpClient) {
  }

  public addLigneCommande(ligneCommande: LigneCommande):Observable<LigneCommande>{
    return this.httpClient.post(this.url+"create", ligneCommande);
  }

  public getLigneCommandes(): Observable<LigneCommande[]>{
    return this.httpClient.get<LigneCommande[]>(this.url);
  }

  public getCommandeById(id: number): Observable<LigneCommande[]> {
    return this.httpClient.get<LigneCommande[]>(this.url+''+id);
  }
}
