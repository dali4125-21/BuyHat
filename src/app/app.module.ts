import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {clienteService} from'./cliente/cliente.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClienteComponent } from './cliente/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { FormComponent } from './cliente/form.component';

const routes: Routes=[
  { path: '', redirectTo: '/clientes', pathMatch: 'full'},
  { path: 'directiva', component: DirectivaComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'clientes', component: ClienteComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    clienteService,
    ProductosComponent,
    FooterComponent,
    DirectivaComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [clienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
