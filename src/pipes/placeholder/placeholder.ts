import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {

  transform(value: string, defecto:string ="Titulo") {
    /*
    if( value ){
      return value;
    }
    else{
      return defecto;
    }*/
    return (value) ? value : defecto;
  }
}
