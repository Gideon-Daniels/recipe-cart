import {Component, OnInit} from "@angular/core";

import { Recipe } from '../recipe.model'
import { RecipeService } from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './recipe-list.component.html',
  selector: 'recipe-list',
})
export class RecipeListComponent implements OnInit{
  // @ts-ignore
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
