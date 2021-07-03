import {useState, useEffect} from "react" 
import Searchbar from "./Searchbar";
// using spinners from react-spinners: https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";


export default function Articles(){
    // creating variable to add the search words to the api
    // Will be passed to Search component 
    const [search, setSearch] = useState("http://hn.algolia.com/api/v1/search?query=")
    const [articles, setArticles] = useState([])
    const [input , setInput] = useState('http://hn.algolia.com/api/v1/search?query=')
    // uuid for unique <li> keys
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      }

    // creating loading var for spinners:
    const [loading, setLoading] = useState(false)
//fetching data from API
    useEffect(() => {
        fetch(input)
          .then((res) => {
              if(res.ok) {
                  return res.json()
              } else {
                  throw new Error("Error!")
              }
              })
          .then((data) => {
              setLoading(false)
              setArticles(data.hits)})
          .catch((err) => console.log(err));
      }, [input])
    
    // useEffect(() => console.log(articles), [articles])
    return (
        <>
        <div className="title">
        <span style={{color: "#D92726"}}>H</span>
        <span style={{color: "#7ED926"}}>a</span>
        <span style={{color: "#26D8D9"}}>c</span>
        <span style={{color: "#8126D9"}}>k</span>
        <span style={{color: "#D92726"}}>e</span>
        <span style={{color: "#7ED926"}}>r</span>
        <span style={{color: "red"}}>‎‎ </span>
        <span style={{color: "#26D8D9"}}>N</span>
        <span style={{color: "#8126D9"}}>e</span>
        <span style={{color: "#D92726"}}>w</span>
        <span style={{color: "#7ED926"}}>s</span>
        </div>
        <Searchbar search={search} setSearch={setSearch} input={input} setInput={setInput} setLoading={setLoading} articles={articles} />
        {
        loading ?
        <ClipLoader color={"red"} loading={loading}  size={75} />
        :
        <>
        <div className="articles">
            
            <ol>
            {articles.map((item) => 
                
              <li key = {uuidv4()}>{(item.title) === null ? 'No title found' : item.title}{' '}
                {(item.url) === null ? '' : <a href={item.url} target="_blank">{item.url}</a>}

                
                  </li>
              )}
              </ol>
          </div>
        </>
        
    
        }
        
        
        
        </>
    )
}