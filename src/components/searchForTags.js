import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

function SearchForTags (props) {

    return(
        <div className="search-for-tags">
            { props.tags.length > 0 && <h2>Bookmarks tags</h2> }
            {props.tags.map(tag => (
                <div className="bookmark-tags-preview" key={tag.id}>
                    { tag.name } <RiCloseCircleLine onClick={ () => props.handleDeleteTag(tag)} />
                </div>
            ))}    
        </div>
    )
}

export default SearchForTags;