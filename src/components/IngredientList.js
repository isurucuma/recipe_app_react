import React from 'react'
import Ingredient from './Ingredient'

export default function IngredientList({ingredients}) {
    const ingredient_elements = ingredients.map(ingredient => {
        return (
            //there will be multiple ingredient components generated and that is why we need a key
            //to keep a reference to each an every ingredient then when ever there is a change in the 
            //ingredient react will use the key to have an access to that specific ingredient and 
            //update only its components. Other ingredients will not gets re-rendered
            <Ingredient key={ingredient.id} {...ingredient}/>
        );
    });
    return (
        <div className="ingredient-grid">
            {ingredient_elements}
        </div>
    )
}
