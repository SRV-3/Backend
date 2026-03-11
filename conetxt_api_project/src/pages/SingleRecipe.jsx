import { useParams } from 'react-router-dom'
import { RecipeContext } from '../context/RecipeContext'
import React, { useContext } from 'react' 
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function SingleRecipe() {
    const {data, setData} = useContext(RecipeContext)
    const params = useParams()

    const navigate = useNavigate()

    const recipe = data.find((recipe) => params.id == recipe.id )

    const { register, handleSubmit, reset } = useForm({
        defaultValues: recipe
    })

    

    const submitHandler = (recipe) => {
        const index = data.findIndex((recipe)=> params.id == recipe.id)
        const copyData = [...data]
        copyData[index] = {...copyData, ...recipe}
        setData(copyData)
        localStorage.setItem("recipes", JSON.stringify(copyData))
        toast.success("Recipe Updated")
    
    }

    const deleteHandler = ()=>{
        const filterData = data.filter((r)=> r.id != params.id)
        setData(filterData)
        localStorage.setItem("recipes", JSON.stringify(filterData))
        toast.success("Recipe Deleted")
        navigate("/recipes")
    }


  return recipe ? (
    <div className='flex'>
        <div className='left w-1/2 p-2'>
            <h1 className='text-5xl font-black'>{recipe.title}</h1>
            <img className="h-[20vh]" src={recipe.url} alt="" />
        </div>
        <div className='right w-1/2 p-2'>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          <input
            onInput={(e)=>e.target.value}
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
            className="w-full mt-4 bg-black text-white py-3 rounded-xl 
                       font-semibold tracking-wide hover:bg-gray-800 
                       transition duration-300 shadow-lg"
          >
            Update Recipe
          </button>
          <button 
            onClick={deleteHandler}
            className="w-full mt-4 bg-red-400 text-white py-3 rounded-xl 
                       font-semibold tracking-wide hover:bg-gray-800 
                       transition duration-300 shadow-lg"
          >
            Delete Recipe
          </button>

        </form>
        </div>
        
    </div>
        
    ) : ("Loading...")
}

export default SingleRecipe
