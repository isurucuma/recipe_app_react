import React, {useState, useEffect} from "react";
import RecipeList from "./RecipeList";
import '../css/app.css';
import {v4 as uuid} from 'uuid';
import EditRecipe from "./EditRecipe";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'react_recipe_app.recipes';

function App() {  

  const [selectedRecipeId, setSelectedRecipeId] = useState();

  // setRecipe is the handler function given by the useState in order to edit the state. We cen give
  // any name to the state, in this we have use the state name as recipe.
  // the argument pass to it is the default state value.
  const [recipes, setRecipe] = useState(sampleRecipes);

  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  // This useEffect will gets run when ever there is a change in the specified variable. if we give []
  // as the soecified element then this will gets run once per a page reload.
  // This method is used to check the local storage and get the recipes in the local storege to the 
  // recipe variable and if the local storage is null, then only we update the current state of the recipe
  // variable otherwise no change 
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(recipeJSON != null){
      setRecipe(JSON.parse(recipeJSON));
    }
  }, []);

  // for each an every change in the recipe variable this will gets called as we have given the recipe
  // in the argument list. then when ever we update, delete or add a new recipe the recipe variable will gets
  // changed and because of that this method will gets run and this will update the local storage with the 
  // current state values in the recipe variable
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handle_recipe_add,
    handle_recipe_delete,
    handle_recipe_edit,
    handle_recipe_change
  }

  function handle_recipe_add(){
    const newRecipe = {
      id: uuid(),
      name: 'New name',
      servings: 1,
      cookTime: '1.00',
      instructions: 'New instructions',
      ingredients: [
        {
          id:uuid(), name: 'Ing name', amount: '1 Tbs'
        }
      ]      
    }; 
    // this function is used to set the state. There are two forms of this method.
    // 1. By giving the upodated state straightway. in this the state will gets updated with the state
    // give in the argumentsp5.
    // 2. The other method is to give a handler function which takes the previous state as an argument
    // this setRecipe method is an asynchronous method an whenever we try to use this method twise make 
    // sure to use the 2nd option rather than going with the 1st option.
    setRecipe([...recipes, newRecipe]);  
    handle_recipe_edit(newRecipe.id);
  }

  function handle_recipe_edit(id){
    setSelectedRecipeId(id);
  }

  function handle_recipe_change(id, recipe){    
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipe(newRecipes);
  }

  // Why we defined this function in this App module rather than defining this in the Recipe module.
  // The reason for that is this method needs to access the recipes array inorder to delete the perticulat 
  // recipe from the array. Therefor we have to define this method inside this App module.
  function handle_recipe_delete(id){
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined);
    }
    setRecipe(recipes.filter(recipe => recipe.id !== id));
  }

  
  return (
    // This is one way of passing the methods and data down the hierarchi. This is by passing the variables and 
    // methods through the components But the problem with this method is that the handle_recipe_delete function
    // is not required by the RecipeList module but in order to pass this function to the Recipe module 
    // we have pass it through the RecipeList module eventough it does not use this method.
    /*<RecipeList 
      recipes={recipes}
      handle_recipe_add={handle_recipe_add}
      handle_recipe_delete={handle_recipe_delete}
    />*/

    // This is the way to use the context to pass the methods and values to the other modules
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <EditRecipe recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  );  

  
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. put salt on chicken\n2. put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Chillie',
        amount: '1 Tbs'
      },
      {
        id: 3,
        name: 'Potato',
        amount: '1 lbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 4,
    cookTime: '0:45',
    instructions: "1. put salt on pork\n2. put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '1 Pounds'
      },
      {
        id: 2,
        name: 'Pepper',
        amount: '1 Tbs'
      }
    ]
  }
];


export default App;
