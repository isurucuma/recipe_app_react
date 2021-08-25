import React, {useContext} from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList({recipes}) {
    // This is the long way of extracting the recaived values from the parent. but we can use the
    // object destructuring to make it easy 
    // const value = useContext(RecipeContext);
    // const handle_recipe_add = value.handle_recipe_add;
    // const handle_recipe_delete = value.handle_recipe_delete;

    // By using object destructuring
    const {handle_recipe_add} = useContext(RecipeContext);

    return (
        <div className="recipe-list">
            <div>
            {recipes.map(recipe => {
                return (
                    /*Here is an important point, that is using the spread operator. 
                    That mekes it easy to access the variables as single elements from the component
                    */
                    //<Recipe key={recipe.id} recipe={recipe}/>
                    // Since I am going to use the context to pass this handle_recipe_delete function
                    // I will remove it from this place.
                    // <Recipe key={recipe.id} {...recipe} handle_recipe_delete={handle_recipe_delete}/>

                    // We need to pass the recipe info only. Recipe delete method will be passed by the 
                    // context
                    <Recipe key={recipe.id} {...recipe}/>
                )
            })}
        </div>
        <div className="recipe-list__add-recipe-btn-container">
            <button onClick={() => {handle_recipe_add();}} className="btn btn--primary">Add Recipe</button>
        </div>
        
        </div>
        
    )
}
