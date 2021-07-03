import { useParams, Link } from "react-router-dom";
export default function Item({ items }) {
    const { selectedArticleID } = useParams()
    const item = items.find(item => item.objectID === selectedArticleID)
    return (
        <div className='item'>
            <h1>{item.title}</h1>
            <h3>Author: {item.author}</h3>
            <p>Article number: {selectedArticleID}</p>
            <p>Link: <a href={item.url} target="_blank">{item.url}</a></p>
            <Link to='/'><button>Back</button></Link>
            


        </div>
    )
}