import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
    ingredients: [
        new Ingredient("Apple", 3),
        new Ingredient("Pear", 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // copy the old state (new js syntax)
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            } 
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.newIngredient
            };
            const updatedIngredients = [...state.ingredients]
            updatedIngredients[action.payload.index] = updatedIngredient;

            return{
                ...state,
                ingredients: updatedIngredients
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            return{
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload
                })
            }

        default:
            return state;
    }
}