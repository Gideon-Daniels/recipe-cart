import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: './shopping-list.component.html',
  selector: 'shopping-list-edit'
})
export class ShoppingListEditComponent implements OnInit{

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm){
    console.log('form', form)
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient)
  }
}
