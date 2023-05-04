import {Component, Input} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  templateUrl: './recipe-detail.component.html',
  selector: 'recipes-detail',
})
export class RecipeDetailComponent{
  // @ts-ignore
 @Input() recipe: Recipe;

 constructor(private recipeService: RecipeService) {
 }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
