import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe implements PipeTransform {
  
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  /*matches(usuarios: IModelo, query: string): boolean {
    return usuarios.name.toLowerCase().includes(query.toLowerCase())
  }

  transform(usuarios: IModelo, query: string): any {
    if (!query) {
      return usuarios;
    }

    return usuarios.filter(u => this.matches(u, query));
  }*/

}
