import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {HttpClient, HttpRequest, HttpEvent,HttpHeaders} from '@angular/common/http';
import { map,catchError,tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable , throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciudad } from './ciudad';
//se puede hacer inyeccion de dependencia y utilizarlo en cualquier parte
//patron de diseño de inyeccion de independencia
@Injectable({
  providedIn: 'root'
})
export class clienteService {

  private urlApi: string="";

  constructor(private http: HttpClient,
               private router: Router){ 
               this.urlApi= environment.apiUrl+'/api';
               }
  getCiudad(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlApi + '/clientes/regiones');}

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlApi + '/clientes');
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlApi}/cliente/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
        })
        );
    }
    //metodo crear 
    create(cliente:Cliente): Observable<Cliente>{
      return this.http.post<Cliente>(`${this.urlApi}/clientes`,cliente).pipe(
        map((response: any)=> response.cliente as Cliente), 
        catchError(e=>{ 
          if(e.status==400){
            return throwError(()=>e);
          }
          if (e.console.mensaje){
            console.log(e.error.mensaje);
          };
          return throwError(()=>e);
        })
      )
    }

    //actualizar metodo
    update (cliente: Cliente): Observable<Cliente>{
      return this.http.put<Cliente>(`${this.urlApi}/clientes/${cliente.id}`,cliente).pipe(
        catchError(e=>{
          if(e.status==400){
            return throwError(()=>e);
          }
          if(e.error.mensaje){ 
            console.error(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );
    }

    //metodo eliminar
    delete (id: number): Observable<Cliente>{
      return this.http.delete<Cliente>(`${this.urlApi}/clientes/${id}`).pipe(
        catchError(e=>{
          if(e.error.mensaje){
            console.error (e.console.mensaje);
          }
          return throwError(()=>e);
        })
      );
    }
}

