import { useState, useEffect } from "react"
import Searchbar from "./Searchbar";
// using spinners from react-spinners: https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";
import Item from "./Item";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Articles() {
  // creating variable to add the search words to the api
  // Will be passed to Search component 
  // const { selectedArticleID } = useParams()
  const [search, setSearch] = useState("http://hn.algolia.com/api/v1/search?query=")
  const [articles, setArticles] = useState([])
  const [input, setInput] = useState('http://hn.algolia.com/api/v1/search?query=')
  const [item, setItem] = useState({ title: 'nothing' })
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
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Error!")
        }
      })
      .then((data) => {
        setLoading(false)
        setArticles(data.hits)
      })
      .catch((err) => console.log(err));
  }, [input])

  function renderItem(d) {


    const foundItem = articles.filter(i => {

      return i.title === d.target.title
    })
    setItem(foundItem[0])
    console.log(item)

  }

  return (
    <Router>
      <div className="title">
        <span style={{ color: "#D92726" }}>H</span>
        <span style={{ color: "#7ED926" }}>a</span>
        <span style={{ color: "#26D8D9" }}>c</span>
        <span style={{ color: "#8126D9" }}>k</span>
        <span style={{ color: "#D92726" }}>e</span>
        <span style={{ color: "#7ED926" }}>r</span>
        <span style={{ color: "red" }}>‎‎ </span>
        <span style={{ color: "#26D8D9" }}>N</span>
        <span style={{ color: "#8126D9" }}>e</span>
        <span style={{ color: "#D92726" }}>w</span>
        <span style={{ color: "#7ED926" }}>s</span>
      </div>
      <Searchbar search={search} setSearch={setSearch} input={input} setInput={setInput} setLoading={setLoading} articles={articles} />
      {
        loading ?
          <ClipLoader color={"red"} loading={loading} size={75} />
          :
          < >
            <Switch>
              <Route exact path='/'>
                <div className="articles">

                  <ol>
                    {articles
                      .map((item) => {
                        
                        return (<li key={uuidv4()}>
                          {(item.title) === null ? 'No title found' : <a title={item.title} className='a-main' onClick={renderItem}>{item.title}</a>}
                          {' '}{(item.url) === null ? '' : <a href={item.url} target="_blank">link</a>} {'|'}
                          <Link to={`articles/${item.objectID}`}> more info </Link>
                        </li>)
                      }
                      )}
                  </ol>
                </div>
              </Route>
              <Route exact path='/articles/:selectedArticleID'>
                <Item items={articles}/>
              </Route>
            </Switch>
          </>

      }

    </Router>
  )
}