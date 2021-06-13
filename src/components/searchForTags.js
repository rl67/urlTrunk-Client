import React from 'react';

function SearchForTags (props) {

    return(
        <div className="search-for-tags">
            <h2>Search for bookmarks with the following tags:</h2>
            <button style={{
                color: 'black',
                backgroundColor: '#b95688', 
                borderRadius: '20px',
                padding: '10px'
                }}>{props.name}
            </button>
            <button id="search" style={{
                marginLeft: '10px'
                }}>Search
            </button>
        </div>
    )
}

export default SearchForTags;