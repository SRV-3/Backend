import { Link } from "react-router-dom"

function RecipeCard(props) {
    const {id, url, title, description, chef} = props.recipe
  return (
    <Link to={`/recipes/details/${id}`} 
        className="hover:scale-105 duration-150 mr-3 mb-3 block w-[15vw] rounded overflow-hidden shadow ">
        <img className="object-cover w-full h-[20vh] rounded" src={url} alt="" />
        <h1 className="px-2 mt-2 font-black">{title}</h1>
        <small className="px-2 text-red-400">{chef}</small>
        <p className="px-2 pb-3">
            {description.slice(0, 100)}...{""}
            <small className="text-blue-400">more</small>
        </p>
    </Link>
  )
}

export default RecipeCard
