import React from 'react';

function SearchForTags (props) {

    return(
        <div className="search-for-tags">
            <h2>Bookmarks tags</h2>
            {props.tags.map(tag => (
                <div className="tagList-preview" key={tag.id}>
                    <button style={{
                        color: 'black',
                        backgroundColor: '#b95688', 
                        borderRadius: '20px',
                        padding: '10px'
                        }}>{tag.name}
                    </button>
                </div>
            ))}    
        </div>
    )
}

export default SearchForTags;