import React, { useContext } from 'react'
import {RecipeContext} from "../context/RecipeContext"
import RecipeCard from '../components/RecipeCard'

function Recipes() {

  const {data} = useContext(RecipeContext)

  const renderRecipes = data.map((recipe)=>(
    <RecipeCard key={recipe.id } recipe={recipe}/>
  ))

  

  return (
    <div className='flex flex-wrap'>
      {data.length > 0 ? renderRecipes : "No Recipe Found"}
    </div>
  )
}

export default Recipes
