import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 3),
        new Ingredient("Pear", 2)
    ];

    getIngredients() {
      return this.ingredients.slice();
  }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngridients(ingredients: Ingredient[]) {
        //Option1:
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient)
        // }

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    
}