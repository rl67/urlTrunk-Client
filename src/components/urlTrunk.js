import React , { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import TagLists from './tagLists';
import AddTagList from './addTagList';
import LoadTagsForTagList from './loadTagsForTagList';
import AddTag from '../components/addTag';
import AddBookmark from './addBookmark';
import GetBookmarks from './getBookmarks';


function UrlTrunk ()  {
    const [ tagListSelected , setTagListSelected ] = useState(null);
    const [ tagListAdded, setTagListAdded ] = useState(false);
    const [ searchTags, setSearchTags ] = useState([]);

    // useEffect(() => {
    // }, [tagListSelected])

    return(
        <div className="urlTrunk">
            <h2>Tag Lists</h2>
            <div className="tag-lists">
                <TagLists getClickedTagList={ tagListSelected => setTagListSelected(tagListSelected) } />
            </div>
            <div className="addTagList">
                <AddTagList newTagList={ tagListAdded => setTagListAdded(tagListAdded) }/>
            </div>            
            <div className="tags-in-list">
                { tagListSelected && <h2>Tags in { tagListSelected.name }</h2> }
                { tagListSelected && tagListSelected.id && <LoadTagsForTagList id={ tagListSelected.id } getClickedTag={ searchTags => setSearchTags(searchTags) } /> }
                { console.log(searchTags) }
            </div>
            <div className="addTag">
               { tagListSelected && <AddTag id={ tagListSelected.id }/> }
            </div>
            <div className="addBookmark">
                <h2>Bookmarks</h2>
                <AddBookmark />
            </div>
            <div className="getBookmarks">
                <GetBookmarks tags={ searchTags } />
            </div>
        </div>

    )

}

export default UrlTrunk;