import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";


function App() {

  return (
  
    <div className="w-screen h-screen text-white font-thin bg-gray-700 py-10 px-[10%]">
      <Navbar/>
      <Mainroutes/>
    </div>
   
  )
}

export default App
