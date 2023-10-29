import {Component, Input, OnInit} from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  templateUrl: './recipe-item.component.html',
  selector: 'recipe-item',
})
export class RecipeItemComponent implements OnInit{
 // @ts-ignore
  @Input() recipe: Recipe;
  // @ts-ignore
  @Input index: number

  ngOnInit(): void {
  }

}
