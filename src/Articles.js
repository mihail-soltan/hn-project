import {useState, useEffect} from "react" 


export default function Articles(){
    const [articles, setArticles] = useState([])
//fetching data from API
    useEffect(() => {
        fetch("http://hn.algolia.com/api/v1/search?query=cryptocurrency")
          .then((res) => res.json())
          .then((data) => setArticles(data.hits))
          .catch((err) => console.log(err));
      }, [])
    
    // useEffect(() => console.log(articles), [articles])
    return (
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
    )
}