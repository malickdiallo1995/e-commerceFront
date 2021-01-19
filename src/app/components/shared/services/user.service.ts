import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modals/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.base_url+'/utilisateurs/';

  constructor(private httpClient: HttpClient) {

  }

  public getUsers():Observable<User[]>{
      return this.httpClient.get<User[]>(this.url);
  }

  public getUserById(id: number):Observable<User[]>{
    return this.httpClient.get<User[]>(this.url+""+id);
  }


  public addUser(user: User){
    this.httpClient.post(this.url+"create", user).subscribe((response) => {
      //console.log(response.status);
    })
  }
}
