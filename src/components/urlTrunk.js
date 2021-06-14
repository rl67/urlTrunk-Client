import React , { useState } from 'react';
import TagLists from './tagLists';
import AddTagList from './addTagList';
import LoadTagsForTagList from './loadTagsForTagList';
import AddTag from '../components/addTag';
import AddBookmark from './addBookmark';
import GetBookmarks from './getBookmarks';
import SearchForTags from '../components/searchForTags';
import { set } from 'lodash';
import SandBox from '../components/sandBox';


function UrlTrunk ()  {
    const [ tagListSelected , setTagListSelected ] = useState(null);    // Selected main tag list. Will fetch tags for this list
    const [ tagListAdded, setTagListAdded ] = useState(false);
    const [ searchTags, setSearchTags ] = useState([]);                 // List of objects with tags to search for/add to bookmark. Id and tag name
    const [ search, setSearch ] = useState(false)

    // Extract the id to a separate id array. To be used as grapqhl argument for tag
    const SearchTagsToArray = (sTags) => {
        let tags = sTags.map(item => item['id']);
        return tags;
    }

    // Delete tag from taglist
    const DeleteTagFromSearchTags = (tag) => {

    }

    return(
        <div className="urlTrunk">
            {/* Print main tag lists */}
            <h2>Tag Lists</h2>
            <div className="tag-lists">
                <TagLists getClickedTagList={ tagListSelected => { setTagListSelected(tagListSelected); setSearchTags([...searchTags, {id: tagListSelected.id, name: tagListSelected.name }]);  } } />
            </div>
            {/* Add new tag list */}
            <div className="addTagList">
                <AddTagList newTagList={ tagListAdded => setTagListAdded(tagListAdded) }/>
            </div>
            {/* Print tags in selected tag list */}
            <div className="tags-in-list">
                { tagListSelected && <h2>Tags in { tagListSelected.name }</h2> }
                { tagListSelected && tagListSelected.id && <LoadTagsForTagList id={ tagListSelected.id } getClickedTag={ (searchTag) => setSearchTags([...searchTags, {id: searchTag.id, name: searchTag.name }]) } /> }
            </div>
            {/* Add new tag to selected tag list */}
            <div className="addTag">
               { tagListSelected && <AddTag id={ tagListSelected.id }/> }
            </div>
            {/* Print selected tags to search for/add to new bookmark */}
            <div className="searchForTags">
                { searchTags && <SearchForTags tags={ searchTags } /> }
                { searchTags.length > 0 && <button id="btnCmd" onClick={ () => {setSearchTags([]); setSearch(false); setTagListSelected(null);} } >Clear</button> }
            </div>
            {/* Add a new bookmark with tags */}
            <div className="addBookmark">
                { searchTags.length > 0 && <AddBookmark tags={ SearchTagsToArray(searchTags) }/>}
            </div>
            {/* Get bookmarks according to selected tags */}
            <div className="getBookmarks">
                { searchTags.length > 0 && <button id="btnCmd" onClick={ () => setSearch(true) } >Search</button> }
                { search && searchTags.length > 0 && <GetBookmarks tags={ SearchTagsToArray(searchTags) } /> }
            </div>
        </div>

    )

}

export default UrlTrunk;