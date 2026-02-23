import { createContext, useState } from "react"

export const RecipeContext = createContext(null)

function RecipeContextProvider(props) {
  const [data, setData] = useState([
    {
      id: "1",
      title: "Paneer Butter Masala",
      chef: "Saurav",
      url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      description: "Rich and creamy North Indian curry made with paneer.",
      ingredients: "Paneer, Butter, Tomato, Cream, Spices",
      instructions: "Heat butter, add tomato puree, add spices, add paneer, cook for 10 mins",
      catogries: "lunch"
    }
  ])
  console.log(data)

  return(
  <RecipeContext.Provider value={{data, setData}}>
    {props.children}
  </RecipeContext.Provider>
  )
}

export default RecipeContextProvider
