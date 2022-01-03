import {useState, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchResults from './SearchResults'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        const getResult = async () => {
            if(searchTerm === '')
            {
                setSearchResult([])
            }
            else
            {
                const res = await fetch(`/api/search?q=${searchTerm}`)
                const {results} = await res.json()
                console.log(results)
                setSearchResult(results)
            }
        } 

        getResult()
        console.log(searchResult)
    }, [searchTerm]) 

    return (
        <div className='relative bg-gray-600 p-4'>
            <div className="container mx-auto flex item-center
             justify-center md:justify-end">
                 <form>
                     <input type="text"
                     name="search"
                     id="search" 
                     className="bg-white h-10 px-5 pr-10 
                     rounded-full text-sm focus:outline-none w-72"
                     onChange={(e) => setSearchTerm(e.target.value)}
                     placeholder="Search"/>
                 <FaSearch className="absolute top-0 right-0 text-black mt-7 mr-9" />
                 </form>

             </div>
            <SearchResults results={searchResult} />
        </div>
    )
}
