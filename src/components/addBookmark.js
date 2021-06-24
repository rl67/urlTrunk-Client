import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKMARK, UPDATE_BOOKMARK } from '../graphql/mutations';

function AddBookmark({ tags, bookmarkToEdit, edit }){
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ note, setNote ] = useState('');
    const [ bmTags, setBmTags ] = useState([]);
    //es-lint ignore
    const [ addBookmark, { dataBookmarkAdd } ] = useMutation(ADD_BOOKMARK);   
    const [ updateBookmark, { dataBookmarkUpdate } ] = useMutation(UPDATE_BOOKMARK);

    useEffect(() => {
        if (edit) {
            setName(bookmarkToEdit.name);
            setUrl(bookmarkToEdit.url);
            setNote(bookmarkToEdit.note);
            setBmTags(tags);
            console.log("tags for edited bm"); //?
            console.log(bookmarkToEdit.id); //??
            console.log(bmTags); //??
            console.log("tags for edited bm - end"); //?
        }

    }, [tags, edit])


    const handleAddBookmark = () => {
        if (edit) {
            let mtags = [
                "6081b6e4fa6a712aadae777a",
                "60aa9944be10fa25dd1dc705",
                "60aa10e2be10fa25dd1dc6ff",
                "60ae94f1b6921d5b408a65c3"
              ];
            updateBookmark({
                variables: {
                    id: "60c8e3556d1af906c270c588", 
                    name: "Compass Trailers",
                    url: "https://youtu.be/V6LbeX2SLXs",
                    note:"Bremser",
                    tags: mtags                   
                    // id: bookmarkToEdit.id,
                    // name: name,
                    // url: url,
                    // note: note,                
                    // tags: bmTags
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
            </form>
        </div>
    )
}

export default AddBookmark;