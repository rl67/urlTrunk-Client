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
    const [ config, setConfig ] = useState(false)       // Configuration mode for tag lists and tags

    // Extract the id to a separate id array. To be used as grapqhl argument for tag
    const SearchTagsToArray = (sTags) => {
        let tags = sTags.map(item => item['id']);
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
        // Fetch tags from TagList and tags in selected bookmark, join to one array
        let bmTags = [];
        bookmark.tagLists.map(tagList => {
            bmTags = [ ...bmTags, { id: tagList.id, name: tagList.name }];
        });
        bookmark.tagsII.map(tag => {
            bmTags = [ ...bmTags, { id: tag.id, name: tag.name } ];
        });
        setSearchTags(bmTags);
    }

    return(
        <div className="urlTrunk">
            <div className="row"> 
                <div className="Config">
                    <button id="btnCmd" >Config</button>
                </div>
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
                    {/* Add a new Bookmark with tags, or update existing Bookmark */}
                    <div className="addBookmark">
                        { searchTags.length > 0 && <AddBookmark tags={ SearchTagsToArray(searchTags) } bookmarkToEdit={ bookmarkToEdit } edit={ edit }/>}
                        {/* { setEdit(false) } */}
                    </div>
                </div>
                <div className="Search">
                    { searchTags.length > 0 && <button id="btnCmd" onClick={ () => setSearch(true) } >Search</button> }
                    { searchTags.length > 0 && <button id="btnCmd" onClick={ () => {setSearchTags([]); setSearch(false); setTagListSelected(null); setEdit(false)} } >Clear</button> }
                </div>
                <div className="columnBookmarks">
                    {/*  Get/load Bookmarks according to selected tags */}
                    <div className="getBookmarks">
                        { <h3>Bookmarks for selected tags</h3> }
                        { search && searchTags.length > 0 && <GetBookmarks tags={ SearchTagsToArray(searchTags) } handleEdit={ OpenBookmarkEdit }/> }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UrlTrunk;