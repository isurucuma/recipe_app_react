import React, {useContext} from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App';
import {v4 as uuid} from 'uuid';

export default function EditRecipe({recipe}) {
    const {handle_recipe_change, handle_recipe_edit} = useContext(RecipeContext);

    function handle_change(changes){
        // this will automatically override the changes and make a new recipe object and pass it to the handler
        // this is the power of the spread operator ... in js
        /* Please make sure that do not change the original props pass by the parent component in react 
           that will lead to errors which will be very much difficult to figure out*/
        handle_recipe_change(recipe.id, {...recipe, ...changes});
    }

    function handle_ingredient_change(id, ingredient){
        const newIngredients = [...recipe.ingredients];
        const index = newIngredients.findIndex(i => i.id === id);
        newIngredients[index] = ingredient;
        handle_change({ingredients: newIngredients});    
    }

    function handle_add_ingredient(){
        const newIngredient = {id:uuid(), name:'', amount:''};
        handle_change({ingredients: [...recipe.ingredients, newIngredient]});
    }

    function handle_delete_ingredient(ingredient_id){
        const new_ingredients = recipe.ingredients.filter(i => i.id !== ingredient_id);
        handle_change({ingredients: new_ingredients});
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button className="btn recipe-edit__remove-button" onClick={() => handle_recipe_edit(undefined)}>&times;</button>
            </div>
            <div className="recipe-edit__details-grid">

                <label className="recipe-edit__label" htmlFor="name">Name</label>
                <input className="recipe-edit__input" type="text" name="name" id="name" value={recipe.name} onChange={e => handle_change({name: e.target.value})} />

                <label className="recipe-edit__label" htmlFor="cooktime">Cook time</label>
                <input className="recipe-edit__input" type="text" name="cooktime" id="cooktime" value={recipe.cookTime} onChange={e => handle_change({cookTime: e.target.value})} />

                <label className="recipe-edit__label" htmlFor="servings">Servings</label>
                <input className="recipe-edit__input" type="number" min="1" name="servings" id="servings" value={recipe.servings} onChange={e => handle_change({servings: parseInt(e.target.value) || ''})} />

                <label className="recipe-edit__label" htmlFor="instructions">Instructions</label>
                <textarea className="recipe-edit__input" name="instructions" id="instructions" value={recipe.instructions} onChange={e => handle_change({instructions: e.target.value})}/>
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => {
                    return (<RecipeIngredientEdit key={ingredient.id} ingredient={ingredient} handle_ingredient_change={handle_ingredient_change} handle_delete_ingredient={handle_delete_ingredient}/>)
                })}
                {/*This contains the edit_ingredient_components */}
                
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button onClick={handle_add_ingredient} className="btn btn--primary">Add Ingredient</button>
            </div>
        </div>
    )
}
