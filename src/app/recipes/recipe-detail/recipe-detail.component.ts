import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  templateUrl: './recipe-detail.component.html',
  selector: 'recipes-detail',
})
export class RecipeDetailComponent{
  // @ts-ignore
 recipe: Recipe;
 // @ts-ignore
  id: number;

 constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
 }

 ngOnInit(){
   this.route.params.subscribe((params: Params) => {
     this.id = +params['id']
     this.recipe = this.recipeService.getRecipe(this.id)
   })
 }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
