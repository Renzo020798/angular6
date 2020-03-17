import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
 
  transform(value: any[], postFilter: String, postBoolean: boolean ): any[] {
    const resultPost: any [] = [];
    // if(postFilter == ""){
    //   return value;}
    if (postBoolean == true){
       for (const post of value) {
        if(postFilter == ""){
          post.expanded = false;
          resultPost.push(post);
        }else{
          if (post.documento.cliente.razon_social.toLocaleLowerCase().indexOf(postFilter.toLocaleLowerCase()) > -1) {
            resultPost.push(post);
        }
        }
      }
    } else { 
      for (const post of value) {
         if(postFilter == ""){
          post.expanded = false;
          resultPost.push(post);
        }else{
          const nomCompleto = post.documento.serie_comprobante + "-" + post.documento.nro_comprobante;
          post.expanded = true;
          if (nomCompleto.toLocaleLowerCase().indexOf(postFilter.toLocaleLowerCase()) > -1) {
            resultPost.push(post);
          }
        }
      } 
    }
    return resultPost;
  }

}
