import { createContext, useEffect, useState } from "react"

export const RecipeContext = createContext(null)

function RecipeContextProvider(props) {
  const [data, setData] = useState([])

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("recipes")) || [])
  },[])

  return(
  <RecipeContext.Provider value={{data, setData}}>
    {props.children}
  </RecipeContext.Provider>
  )
}

export default RecipeContextProvider
