import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/cliente/cliente';
import { Ciudad }  from 'src/app/cliente/ciudad';
import { clienteService} from 'src/app/cliente/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string="Crear Cliente";
  
  Cliente: Cliente={};
  ciudad: Ciudad[]=[];
  
  errores: string[];

  constructor(private clienteService: clienteService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private authService: AuthService ) { }

  ngOnInit(): void {   

    this.getCiudad();
    this.getCargarCliente();
    
  }

  getCiudad(): void{
    this.clienteService.getCiudad().subscribe(respuesta=>{
      this.ciudad=respuesta;
    }
    )
  }
  
  create(): void{
    this.clienteService.create(this.cliente).subscribe({
       next: (cliente: Cliente)=>{
          this.router.navigate(['/clientes']);
          swal.fire({
            icon: 'success',
            title: 'Nuevo Cliente, El cliente '+ cliente.nombre+' ha sido creado con éxito`',
            showConfirmButton: false,
            timer: 3000
          })
       },
       error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);  
       } 
    });    
  }

  getCargarCliente(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id=params.get('id');
       if(id){
         this.clienteService.getCliente(Number(id)).subscribe(cliente=>{
            this.cliente=cliente
         })
       }
    }) 

  }

  update(): void{
    this.clienteService.update(this.cliente).subscribe({
      next:(cliente)=>{
         this.router.navigate(['/clientes']);
         swal.fire('Cliente Actulizado',`${cliente.nombre}`,'success');
      },
      error:(err)=>{
        this.errores=err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }


}
