import React, { useState, useEffect, useRef} from 'react';

function SearchBar({ search }) {
    const [input, setInput] = useState();

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="Search-bar" onSubmit={handleSubmit}>
            <input type="text" className="search-bar-input" placeholder="Search for an item" 
            value={input} name="search" onInput={e => setInput(e.target.value)}/>
            <button className="Search-bar-btn" onClick={() => search(input)}>Search</button>
        </form>
    )
}

export default SearchBar;