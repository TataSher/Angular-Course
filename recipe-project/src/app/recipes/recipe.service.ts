import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    // we make recipes private so the array could only be accessed via getRecipes method
    private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Very Tasty', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    new Recipe('Test Recipe 2', 'Very Tasty', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505')
  ];

  getRecipes() {
      // below returns a copy of the recipes array
      return this.recipes.slice();
  }

}