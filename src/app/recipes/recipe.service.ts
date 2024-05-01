import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

 private recipes: Recipe[] = [
    new Recipe('Cheeseburger','A perfect cheeseburger, perfectly proportioned and styled, shot in a fast food advertising style and isolated on white.' +
      ' Sesame seed bun, visible condensation on tomatoes, onions, pickles, mayo, mustard, ketchup.',
      'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=2048x2048&w=is&k=20&c=nKbaKhC7zMeFFODZQHmMUlinK-npJ9exg8yRE9xgQ5w=',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('tomatoes', 20),
        new Ingredient('onions', 20),
        new Ingredient('pickles', 20),
        new Ingredient('Sesame seed bun,', 20),
    ]),
    new Recipe('Boerewors salad','Boerewors (translation: farmers\' sausage) is a spicy South African beef sausage. ' +
      'There is balsamic vinegar on this salad and cashew nuts,' +
      ' cherry tomatoes, fried mushrooms, sesame seeds and dhanya (cilantro/coriander)',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3478&q=80',
      [
        new Ingredient('Beef sausges', 1),
        new Ingredient('cherry tomatoes', 3),
        new Ingredient('balsamic vinegar', 1),
        new Ingredient('lettuce', 4),
        new Ingredient('cashew nuts', 4),
        new Ingredient('fried mushrooms', 2),
        new Ingredient('sesame seeds', 2),
        new Ingredient('dhanya (cilantro/coriander)', 2),
    ]),
  ];

 constructor(private shoppingListService: ShoppingListService) {
 }

 setRecipes(recipes: Recipe[]){
   this.recipes = recipes;
   this.recipesChanged.next(this.recipes.slice());
 }

 getRecipes(){
   return this.recipes.slice();
 }

 getRecipe(index:number){
   return this.recipes[index];
 }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
   this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
   this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
   this.recipes.splice(index,1);
   this.recipesChanged.next(this.recipes.slice());
  }
}
