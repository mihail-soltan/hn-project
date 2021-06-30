import {useRef} from "react" 

export default function Searchbar({search, setSearch, setLoading}) {
    // referancing to the search bar input:
    const searchInput = useRef()

    // creating handle search func to add searched words to the api
    function handleSearchbarChange (e) {
        // asign value of input to variable
        e.preventDefault()
        setLoading(true)
        const base = "http://hn.algolia.com/api/v1/search?query="
        const data = searchInput.current.value
        if (data === '') return
        setSearch(base + data)
        searchInput.current.value = null
    }

   /* const[search, setSearch] = useState('')
    const searchArticles = (e) =>{
        setSearch(e.target.value)
    }
    return(
        <div className="searchbar">
        <input type="text" placeholder="Search" onChange={searchArticles}></input>
        <button role="submit">Go</button>
        </div>
    ) */

    return (
        <form onSubmit={handleSearchbarChange}>
        <div style={{display: "flex"}} >
            <input type='text'
                placeholder='Type here to search...'
                ref={searchInput} >
            </input>
            <button onClick={handleSearchbarChange}>&#x1F50D;</button>
        </ div>
        </form>
    )
}