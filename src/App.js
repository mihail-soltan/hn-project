import {useState, useEffect} from "react" 
import Articles from "./Articles"
import Searchbar from "./Searchbar";

function App() {
  return <div className="App">
  <Searchbar/>
  <Articles/>
  </div>

}

export default App;
