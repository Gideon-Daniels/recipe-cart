import {Component, OnInit} from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";

@Component({
  templateUrl: './shopping-list.component.html',
  selector: 'shopping-list'
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredients[] = [
    new Ingredients('Tomatoes', 4),
    new Ingredients('Onions', 20)
  ];

  constructor() {
  }
  ngOnInit(): void {
  }

  protected readonly Ingredients = Ingredients;
}
