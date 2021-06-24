import React , { useState } from 'react';
import TagLists from './tagLists';
import AddTagList from './addTagList';
import LoadTagsForTagList from './loadTagsForTagList';
import AddTag from '../components/addTag';
import AddBookmark from './addBookmark';
import GetBookmarks from './getBookmarks';
import SearchForTags from '../components/searchForTags';


function UrlTrunk ()  {
    const [ tagListSelected , setTagListSelected ] = useState(null);    // Selected main tag list. Will fetch tags for this list
    const [ tagListAdded, setTagListAdded ] = useState(false);
    const [ searchTags, setSearchTags ] = useState([]);                 // List of objects with tags to search for/add to bookmark. Id and tag name
    const [ search, setSearch ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ bookmarkToEdit, setBookmarkToEdit ] = useState(null);
    const [ tagsIds, setTagIds ] = useState([]);        // the id element of searchTags, the tag object

    // Extract the id to a separate id array. To be used as grapqhl argument for tag
    const SearchTagsToArray = (sTags) => {
        let tags = sTags.map(item => item['id']);
        // setTagIds(tags);
        return tags
    }

    // Delete tag from the search for tags list
    const DeleteTagFromSearchTags = (tag) => {
        setSearchTags(searchTags.filter(x => x.id !== tag.id)); // Remove tag clicked for deletion
        setSearch(false);   // tags selected for search is modified => have to do new search
    }

    // handler - Prepare selected Bookmark for editing
    const OpenBookmarkEdit = (bookmark) => {
        setEdit(true);
        setBookmarkToEdit(bookmark);
        console.log(bookmark)//??
    }

    return(
        <div className="urlTrunk">
            <div className="row"> 
                <div className="columnTags">
                    {/* Print main tag lists */}
                    <h3>Tag Lists</h3>
                    <div className="tag-lists">
                        <TagLists getClickedTagList={ tagListSelected => { setTagListSelected(tagListSelected); setSearchTags([...searchTags, {id: tagListSelected.id, name: tagListSelected.name }]);  } } />
                    </div>
                    {/* Add new tag list */}
                    <div className="addTagList">
                        <AddTagList newTagList={ tagListAdded => setTagListAdded(tagListAdded) }/>
                    </div>
                    {/* Print tags in selected tag list */}
                    <div className="tags-in-list">
                        { tagListSelected && <h3>Tags in { tagListSelected.name }</h3> }
                        { tagListSelected && tagListSelected.id && <LoadTagsForTagList id={ tagListSelected.id } getClickedTag={ (selectedTag) => setSearchTags([...searchTags, {id: selectedTag.id, name: selectedTag.name }]) } /> }
                    </div>
                    {/* Add new tag to selected tag list */}
                    <div className="addTag">
                    { tagListSelected && <AddTag id={ tagListSelected.id }/> }
                    </div>
                    {/* Print selected tags to search for/add to new bookmark */}
                    <div className="searchForTags">
                        { searchTags.length > 0 && <h3>Bookmarks tags</h3> }
                        { searchTags && <SearchForTags tags={ searchTags } handleDeleteTag={ DeleteTagFromSearchTags } /> }
                    </div>
                    {/* Add a new bookmark with tags */}
                    <div className="addBookmark">
                        { console.log(searchTags) } //??
                        { searchTags.length > 0 && <AddBookmark tags={ SearchTagsToArray(searchTags) } bookmarkToEdit={ bookmarkToEdit } edit={ edit }/>}
                    </div>
                </div>
                <div className="columnBookmarks">
                    {/* Get bookmarks according to selected tags */}
                    <div className="getBookmarks">
                        { searchTags.length > 0 && <button id="btnCmd" onClick={ () => setSearch(true) } >Search</button> }
                        { searchTags.length > 0 && <button id="btnCmd" onClick={ () => {setSearchTags([]); setSearch(false); setTagListSelected(null);} } >Clear</button> }
                        { <h3>Bookmarks for selected tags</h3> }
                        { console.log("print tgs")}
                        { console.log(searchTags.length)}
                        { search && searchTags.length > 0 && <GetBookmarks tags={ SearchTagsToArray(searchTags) } handleEdit={ OpenBookmarkEdit }/> }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UrlTrunk;