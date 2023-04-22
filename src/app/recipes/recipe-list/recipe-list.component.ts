import { Component, OnInit} from "@angular/core";
import { Recipe } from '../recipe.model'
const img = 'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/1:1/w_1920,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg'

@Component({
  templateUrl: './recipe-list.component.html',
  selector: 'recipe-list',
})
export class RecipeListComponent implements OnInit{
   recipes: Recipe[] = [
     new Recipe('A test recipe','this is simply a tests', img),
     new Recipe('A test recipe','this is simply a tests', img),
   ];
  constructor() {}

  ngOnInit(): void {
  }
}
