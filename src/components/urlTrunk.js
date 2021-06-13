import React , { useState } from 'react';
import TagLists from './tagLists';
import AddTagList from './addTagList';
import LoadTagsForTagList from './loadTagsForTagList';
import AddTag from '../components/addTag';
import AddBookmark from './addBookmark';
import GetBookmarks from './getBookmarks';
import SearchForTags from '../components/searchForTags';
import { set } from 'lodash';


function UrlTrunk ()  {
    const [ tagListSelected , setTagListSelected ] = useState(null);
    const [ tagListAdded, setTagListAdded ] = useState(false);
    const [ searchTags, setSearchTags ] = useState([]);
    const [ search, setSearch ] = useState(false)

    const SearchTagsToArray = (sTags) => {
        let tags = sTags.map(item => item['id']);
        return tags;
    }

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
                { tagListSelected && tagListSelected.id && <LoadTagsForTagList id={ tagListSelected.id } getClickedTag={ (searchTag) => setSearchTags([...searchTags, {id: searchTag.id, name: searchTag.name }]) } /> }
            </div>
            <div className="addTag">
               { tagListSelected && <AddTag id={ tagListSelected.id }/> }
            </div>
            <div className="searchForTags">
                <button onClick={ () => (setSearchTags([])) }>Clear</button>
                { searchTags && <SearchForTags tags={ searchTags } /> }
            </div>
            <div className="addBookmark">
                <AddBookmark />
            </div>
            <div className="getBookmarks">
                <button onClick={ () => setSearch(true) }>Search</button>
                { search && searchTags && <GetBookmarks tags={ SearchTagsToArray(searchTags) } /> }
            </div>
        </div>

    )

}

export default UrlTrunk;