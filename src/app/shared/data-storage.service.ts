import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {RecipeService} from "../recipes/recipe.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes(){
  const recipes = this.recipesService.getRecipes();
  this.http.put('https://recipe-cart-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
    console.log(response)
  });
  }
}
