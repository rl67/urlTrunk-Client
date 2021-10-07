import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKMARK, UPDATE_BOOKMARK, DELETE_BOOKMARK } from '../graphql/mutations';

function AddBookmark({ tags, bookmarkToEdit, edit }){
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ note, setNote ] = useState('');
    //es-lint ignore
    const [ addBookmark, { dataBookmarkAdd } ] = useMutation(ADD_BOOKMARK);   
    const [ updateBookmark, { dataBookmarkUpdate } ] = useMutation(UPDATE_BOOKMARK);
    const [ deleteBookmark, { dataBookmarkDelete } ] = useMutation(DELETE_BOOKMARK);

    useEffect(() => {
        // Fill info for selecte BM to edit, into to the edit Form
        if (edit) {
            setName(bookmarkToEdit.name);
            setUrl(bookmarkToEdit.url);
            setNote(bookmarkToEdit.note);
        }

    }, [tags, edit])


    const handleAddBookmark = () => {
        if (edit) {
            updateBookmark({
                variables: {
                    id: bookmarkToEdit.id,
                    name: name,
                    url: url,
                    note: note,                
                    tags: tags
                }
            })
        }
        else {
            addBookmark({
                variables: {
                    name: name,
                    url: url,
                    note: note,                
                    tags: tags,
                }
            })
        }
    }
    
    const handleDeleteBookmark = () => {
        deleteBookmark({
            variables: {
                id: bookmarkToEdit.id
            }
        })
    }

    return(
        <div className="add-bookmark">
            <form id="add-url" onSubmit={() => handleAddBookmark() }>
                <div className="field">
                    <label>Name of new bookmark:</label>
                    <input 
                        type="text"
                        required
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }/>
                </div>                
                <div className="field">
                    <label>URL:</label>
                    <input
                        type="url"
                        required
                        value={ url }
                        onChange={ (e) => setUrl(e.target.value) }/>
                </div>
                <div className="field">
                    <label>Note:</label>
                    <textarea
                        type="text"
                        value={ note }
                        onChange={ (e) => setNote(e.target.value) } />
                </div>
                <button id="btnCmd" >{ edit ? "Save Bookmark" : "Add Bookmark" }</button>
                { edit && <button id="btnCmd" onClick={() => handleDeleteBookmark()} >Delete Bookmark</button>}
            </form>
        </div>
    )
}

export default AddBookmark;