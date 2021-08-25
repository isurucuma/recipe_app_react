import React from 'react'

export default function RecipeIngredientEdit({ingredient, handle_ingredient_change, handle_delete_ingredient}) {
    function handle_change(changes){
        handle_ingredient_change(ingredient.id, {...ingredient, ...changes});
    }

    function handle_delete(){
        handle_delete_ingredient(ingredient.id);
    }
    return (
        <>
        <input className="recipe-edit__input" type="text" value={ingredient.name} onChange={e => handle_change({name: e.target.value})}/>
        <input className="recipe-edit__input" type="text" value={ingredient.amount} onChange={e => handle_change({amount: e.target.value})}/>
        <button onClick={handle_delete} className="btn btn--danger">&times;</button>
        </>
    )
}
