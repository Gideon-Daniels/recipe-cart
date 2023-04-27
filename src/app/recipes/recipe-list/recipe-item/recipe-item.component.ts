import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  templateUrl: './recipe-item.component.html',
  selector: 'recipe-item',
})
export class RecipeItemComponent implements OnInit{
 // @ts-ignore
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>()

 constructor() {
 }
  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit()
  }
}
