import {Component, OnDestroy, OnInit} from "@angular/core";

import { Recipe } from '../recipe.model'
import { RecipeService } from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './recipe-list.component.html',
  selector: 'recipe-list',
})
export class RecipeListComponent implements OnInit, OnDestroy{
  // @ts-ignore
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
