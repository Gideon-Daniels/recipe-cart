import {Component} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

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

 constructor(private recipeService: RecipeService, private route: ActivatedRoute , private router: Router) {
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

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route})
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
