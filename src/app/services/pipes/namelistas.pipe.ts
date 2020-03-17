import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'namelistas'
})

export class Namelistas implements PipeTransform {

transform(value: number, lista: any[]): string {
    let descripcion="";

    for (let index = 0; index < lista.length; index++) {
      if(lista[index].id==value){
        descripcion=lista[index].val;
        break;
      }
        
    }
    return descripcion;
    
   }
}