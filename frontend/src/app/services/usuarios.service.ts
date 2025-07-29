import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = environment.apiUrl+ "usuarios";
  private httpClient = inject(HttpClient);

  constructor() { }

  async getAll(){
    return firstValueFrom(this.httpClient.get<User[]>(this.url));
  }

  async crear(usuario: User){ 
    return firstValueFrom(this.httpClient.patch<User>(this.url + "/register", usuario));
  }

  async getById(id_usuario:number){
    return firstValueFrom(this.httpClient.get<User>(this.url+"/"+id_usuario));
  }
}
