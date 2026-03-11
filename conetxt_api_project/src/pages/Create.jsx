import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { RecipeContext } from "../context/RecipeContext" 
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Create() {
    const navigate = useNavigate()
    const { data, setData } = useContext(RecipeContext)
    const { register, handleSubmit, reset } = useForm()

    const submitHandler = (recipe) => {
        recipe.id = nanoid()
        const copyData = [...data]
        copyData.push(recipe)
        setData(copyData)
        localStorage.setItem("recipes", JSON.stringify(copyData))
        toast.success("New Recipe Created")
        reset()
        navigate('/recipes')
    }

  return (
    <div className="h-[70vh]  from-gray-100 to-gray-300 py-4 px-4">

      <div className="max-w-xl mx-auto rounded-3xl p-8 space-y-5">

        <h2 className="text-3xl font-bold text-center text-white-800 mb-6">
          🍽 Create Recipe
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          <input
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("title")}
            type="text" 
            placeholder="Recipe Title"
          />
          <small className='text-red-500 text-sm'>This is how the error is shown</small>

          <input
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("chef")}
            type="text" 
            placeholder="Chef"
          />

          <input
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("url")}
            type="url" 
            placeholder="Enter image url"
          />

          <textarea
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("description")}
            placeholder="Recipe Description"
            rows="3"
          />

          <textarea
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("ingredients")}
            placeholder="Write Ingredients separated by comma"
            rows="3"
          />

          <textarea
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition
                       placeholder:text-gray-400"
            {...register("instructions")}
            placeholder="Write instructions separated by comma"
            rows="3"
          />

          <select 
            className="w-full border border-gray-300 rounded-xl p-3 
                       focus:ring-2 focus:ring-black outline-none transition"
            {...register("catogries")}
          >
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="supper">Supper</option>
              <option value="dinner">Dinner</option>
          </select>
          
          <button 
            type="submit"
            className="w-full mt-4 bg-black text-white py-3 rounded-xl 
                       font-semibold tracking-wide hover:bg-gray-800 
                       transition duration-300 shadow-lg"
          >
            Save Recipe
          </button>

        </form>
      </div>
    </div>
  )
}

export default Create