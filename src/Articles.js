import {useState, useEffect} from "react" 
import Searchbar from "./Searchbar";


export default function Articles(){
    // creating variable to add the search words to the api
    // Will be passed to Search component 
    const [search, setSearch] = useState("http://hn.algolia.com/api/v1/search?query=")
    const [articles, setArticles] = useState([])
//fetching data from API
    useEffect(() => {
        fetch(search)
          .then((res) => res.json())
          .then((data) => setArticles(data.hits))
          .catch((err) => console.log(err));
      }, [search])
    
    // useEffect(() => console.log(articles), [articles])
    return (
        <>
        <Searchbar search={search} setSearch={setSearch} />
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
    )
}