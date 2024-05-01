import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes(){
  const recipes = this.recipesService.getRecipes();
  this.http.put('https://recipe-cart-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
    console.log(response);
  });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipe-cart-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
      return recipes.map((recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
          }
        )
      );
    }
    ),tap<Recipe[]>(recipes => {
          this.recipesService.setRecipes(recipes);
        }
      )
    )
  }
}
