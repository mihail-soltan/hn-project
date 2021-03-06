import {useRef} from "react" 

export default function Searchbar({search, setSearch, setLoading, input, setInput, articles}) {
    // referancing to the search bar input:
    const searchInput = useRef()

    // creating handle search func to add searched words to the api
    function handleSearchbarChange (e) {
        // asign value of input to variable
        e.preventDefault()
        
        
        const data = searchInput.current.value
        if (data === '') {
            return alert('Invalid search...')
        }else {
            setLoading(true)
            setInput(search + data + "&hitsPerPage=50")
            searchInput.current.value = null
            console.log(articles.length)
            
        }

        
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