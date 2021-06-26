import {useState} from "react" 

export default function Searchbar({search, setSearch}) {
    console.log(search)

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
        <>
            <input type='text'
                placeholder='Type here to search...' >

            </input>
            <button>&#x1F50D;</button>
            
        

        </>
    )
}