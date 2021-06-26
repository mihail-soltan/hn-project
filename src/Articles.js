import {useState, useEffect} from "react" 
import Searchbar from "./Searchbar";
// using spinners from react-spinners: https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";


export default function Articles(){
    // creating variable to add the search words to the api
    // Will be passed to Search component 
    const [search, setSearch] = useState("http://hn.algolia.com/api/v1/search?query=")
    const [articles, setArticles] = useState([])

    // creating loading var for spinners:
    const [loading, setLoading] = useState(false)
//fetching data from API
    useEffect(() => {
        fetch(search)
          .then((res) => res.json())
          .then((data) => {
              setLoading(false)
              setArticles(data.hits)})
          .catch((err) => console.log(err));
      }, [search])
    
    // useEffect(() => console.log(articles), [articles])
    return (
        <>
        <Searchbar search={search} setSearch={setSearch} setLoading={setLoading} />
        {
        loading ?
        <ClipLoader color={"red"} loading={loading}  size={150} />
        :
        <>
        <div className="articles">
            
            <ol>
            {articles.map((item) => (
              <li>  
                <a href ={item.url}>
                      {item.title}
                  </a>
                  </li>
              ))}
              </ol>
          </div>
        </>
        
    
        }
        
        
        
        </>
    )
}