import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  facturas: string[]=['fac_001', 'fac_002','fac_003', 'fac_004','fac_005', 'fac_006']
  
  habilitar=true;

  constructor() { }

  ngOnInit(): void {
  }
 
  setHabilitar(): void{
  this.habilitar=(this.habilitar==true)?false:true;
  }
}
