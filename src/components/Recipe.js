import React, {useContext} from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";

// Here we have used the destructuring of object props
export default function Recipe(props) {
  const {
    id,
    name, 
    cookTime, 
    servings, 
    instructions,
    ingredients,
  } = props ;

const {handle_recipe_delete, handle_recipe_edit} = useContext(RecipeContext);

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div>
          <button onClick={() => handle_recipe_edit(id)} className="btn btn--primary mr-1">Edit</button>
          <button onClick={() => handle_recipe_delete(id)} className="btn btn--danger">Delete</button>
        </div>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Cook time:</span>
          <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
          <span className="recipe__label">Servings:</span>
          <span className="recipe__value">{servings}</span>
      </div>
      <div className="recipe__row">
          <div className="recipe__label">Instructions:</div>
          <div className="recipe__value recipe__instructions recipe__value--indented">
              {instructions}
          </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients:</span>        
        <div className="recipe__value recipe__value--indented">
          {/* Here we don't need to give an id because there is only one Ingredient list for single recipe */}
          <IngredientList ingredients={ingredients}/>
        </div>                  
      </div>
    </div>
  );
}
