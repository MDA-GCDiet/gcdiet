import {Injectable, Pipe, PipeTransform} from '@angular/core';
// import {Customer} from '../services/Customer';
import {RecipesPage} from "../pages/recipes/recipes";

@Pipe({
  name: 'customerEmailFilter'
})
@Injectable()
export class CustomerEmailFilter implements PipeTransform {
  hola: string = '';
  transform(recipes: RecipesPage[], args: string): any {
/*
    return recipes.filter(item =>{
       console.log(item);
       return this.hola == item.user;
    }
       //console.log(this.hola)
    ) ;
*/
console.log(args);
     return recipes.filter(item => {
       if (!item.user){
         return false
       } else {
         return item.user.toLowerCase().indexOf(args.toLowerCase()) !== -1;

       }
     });
  };
}
