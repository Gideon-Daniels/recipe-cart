import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Recipe } from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  templateUrl: './recipe-item.component.html',
  selector: 'recipe-item',
})
export class RecipeItemComponent implements OnInit{
 // @ts-ignore
  @Input() recipe: Recipe;

 constructor(private recipeService: RecipeService) {
 }
  ngOnInit(): void {
  }

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
