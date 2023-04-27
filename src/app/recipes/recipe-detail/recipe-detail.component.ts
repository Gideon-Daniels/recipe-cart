import {Component, Input} from "@angular/core";
import {Recipe} from "../recipe.model";

@Component({
  templateUrl: './recipe-detail.component.html',
  selector: 'recipes-detail',
})
export class RecipeDetailComponent{
  // @ts-ignore
 @Input() recipe: Recipe;
}
