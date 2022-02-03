import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient("Apple", 3),
        new Ingredient("Pear", 2)
    ]
};

export function shoppingListReducer(
    state = initialState,
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
            console.log(state)
            console.log(action.payload)
            const ingredient = state.ingredients[action.payload.index];
            console.log(action.payload.newIngredient)
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