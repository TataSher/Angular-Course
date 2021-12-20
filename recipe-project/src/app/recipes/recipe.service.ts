import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
    // we make recipes private so the array could only be accessed via getRecipes method
    private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'Very Tasty',
      'https://www.thespruceeats.com/thmb/cckc3_4QUQ79kSFhcLPM8xg9F3g=/3797x2848/smart/filters:no_upscale()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe(
      'Burger',
      'Very Tasty',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/boom-burger-1518627283.jpg?crop=1.00xw:0.753xh;0,0.200xh&resize=1200:*',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes() {
      // below returns a copy of the recipes array
      return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngridients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}