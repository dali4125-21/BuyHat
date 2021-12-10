import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public autor: any = { nombre: 'Alejandro Trujillo, Zayda Parra, Dalila Castañeda', empresa: 'Empresa:Buyhat', email:' email:buyhat@hotmail.com'};
  

  constructor() { }


  ngOnInit(): void {
  }

}
