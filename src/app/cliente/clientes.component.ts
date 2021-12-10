import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Ciudad }  from './ciudad';
import { clienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import { ModalService } from './detalle/modal.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClienteComponent implements OnInit{

  title= 'cliente';
  
  //Clientes: Cliente[]=[
   // { id: 1, nombre: 'Carol', apellido:'Guzman' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
    //{ id: 2, nombre: 'Andres', apellido:'Zapata' , email: 'diasol@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 3, nombre: 'Sandra', apellido:'Torrez' , email: 'Alejo1230@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 4, nombre: 'Lina', apellido:'Castañeda' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 5, nombre: 'Federico', apellido:'Pelaez' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 6, nombre: 'Antonia', apellido:'Guillen' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 7, nombre: 'Sergio', apellido:'Giraldo' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
    //{ id: 8, nombre: 'Zayda', apellido:'Lopez' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 9, nombre: 'Alejandro', apellido:'Lara' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
   // { id: 10, nombre: 'Camilo', apellido:'Restrepo' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
    //{ id: 11, nombre: 'Juan', apellido:'Parra' , email: 'daniela@hotmail.com',celular: '3014599771', createAt:'2017-12-17'},
  //]
  clientes: Cliente[]=[];

 constructor ( private clienteService: clienteService) {}
  
  ngOnInit(): void {
    this.getClientes();   
  }
  getClientes(): void{
    this.clienteService.getClientes().subscribe(response =>{
      this.clientes = response;
    })
  }

  delete(cliente: Cliente): void {
    if(this.authService.isAuthenticated()){
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe({
               next: () => {
                this.clientes = this.clientes.filter(cli => cli !== cliente)
                        swal.fire(
                          'Cliente Eliminado!',
                          `Cliente ${cliente.nombre} eliminado con éxito.`,
                          'success'
                        )
               }
        })
      }
    })
    
  }else{
    this.router.navigate(['login']) 
  }
 }

 abrirModal(cliente: Cliente) {
  this.clienteSeleccionado = cliente;
   this.modalService.abrirModal();
}

  

}

}

