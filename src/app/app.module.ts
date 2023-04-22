import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipes/recipe.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    [RecipeComponent, RecipeListComponent, RecipeItemComponent, RecipeDetailComponent],
    [ShoppingListComponent, ShoppingListEditComponent]
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
