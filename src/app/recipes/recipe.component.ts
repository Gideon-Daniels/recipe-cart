import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'recipes',
  templateUrl: 'recipe.component.html',
})
export class RecipeComponent implements OnInit{
  // @ts-ignore
  @Input() selectedRecipe : Recipe;

  displayRecipe(recipeDetails: Recipe){
    this.selectedRecipe = recipeDetails
  }

  ngOnInit(): void {
  }
}
