import {Component, EventEmitter, OnInit, Output} from "@angular/core";

import { Recipe } from '../recipe.model'
import { RecipeService } from "../recipe.service";

@Component({
  templateUrl: './recipe-list.component.html',
  selector: 'recipe-list',
})
export class RecipeListComponent implements OnInit{
  // @ts-ignore
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
