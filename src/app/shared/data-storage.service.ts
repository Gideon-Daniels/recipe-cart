import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService,
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://recipe-cart-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes,
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://recipe-cart-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          { params: new HttpParams().set('auth', user.token) },
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap<Recipe[]>((recipes) => {
        this.recipesService.setRecipes(recipes);
      }),
    );
  }
}
