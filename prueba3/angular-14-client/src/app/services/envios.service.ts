import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Envio } from '../models/envio.model';

const baseUrl = 'http://localhost:8585/api/envios';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Envio[]> {
    return this.http.get<Envio[]>(baseUrl);
  }

  get(id: any): Observable<Envio> {
    return this.http.get<Envio>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByNombre(nombre: any): Observable<Envio[]> {
    return this.http.get<Envio[]>(`${baseUrl}?nombre=${nombre}`);
  }
}