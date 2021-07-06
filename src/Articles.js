import { useState, useEffect } from "react"
import Searchbar from "./Searchbar";
// using spinners from react-spinners: https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";

import Pagination from "./Pagination"
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
  const [search, setSearch] = useState("https://hn.algolia.com/api/v1/search?query=")
  const [articles, setArticles] = useState([])
  const [input, setInput] = useState('https://hn.algolia.com/api/v1/search?query=&hitsPerPage=50')
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
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(10)

  //fetching data from API
  useEffect(() => {
    setLoading(true)
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

    // updates the results automatically every 5 minutes
    const updateArticleList = setInterval(() => {
      fetch(input)
      console.log(`${input}, fetching`)
    }, 300000)

    // stops fetching when updating the query 
    return () => {
      clearInterval(updateArticleList)
      console.log('stopped fetching')
    }

  }, [input])

  function renderItem(d) {


    const foundItem = articles.filter(i => {

      return i.title === d.target.title
    })
    setItem(foundItem[0])
    console.log(item)

  }
  // useEffect(() => console.log(articles), [articles])

  // Get current posts
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  // change page 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
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
          <Router>
            <Switch>
              <Route exact path='/'>
                <div className="articles">

                  <ol >
                    {articles.length > 0 ? currentArticles.map((item) =>
                      <li className="stories" key={uuidv4()}>
                        <a href={item.url} target="_blank">
                          {item.title ? item.title : "deleted"}
                        </a>{'|'}
                        <Link to={`articles/${item.objectID}`}> more info </Link>
                      </li>
                    ) : <h1>Oops, no results found</h1>}
                  </ol>
                </div>
                <div className="pagination">
                  <Pagination articlesPerPage={articlesPerPage} totalArticles={articles.length} paginate={paginate} />
                </div>
              </Route>
              <Route exact path='/articles/:selectedArticleID'>
                <Item items={articles} />
              </Route>
            </Switch>

          </Router>
      }
    </>



  )
}