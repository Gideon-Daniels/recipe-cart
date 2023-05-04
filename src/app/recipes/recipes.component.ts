import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{
  // @ts-ignore
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipesService.recipeSelected.subscribe( (recipe: Recipe) => {
      this.selectedRecipe = recipe;
    })
  }
}
