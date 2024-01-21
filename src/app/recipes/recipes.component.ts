import {Component, OnInit} from '@angular/core';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'recipes',
  templateUrl: 'recipes.component.html',
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
  }
}
