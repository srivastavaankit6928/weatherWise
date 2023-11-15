import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar({location,setLocation}){
    return(
        <div className="searchBox">
            <div className="search">
                <input type="text"  value={location} onChange={(e) => setLocation(e.target.value)}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
            </div>
        </div>
    );
}

export default SearchBar
