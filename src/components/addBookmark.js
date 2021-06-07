import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKMARK } from '../graphql/mutations';

function AddBookmark(){
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ note, setNote ] = useState('');
    const [ addBookmark, { data } ] = useMutation(ADD_BOOKMARK);    //es-lint ignore

    const handleAddBookmark = () => {
        addBookmark({
            variables: {
                name: name,
                url: url,
                note: note,
            }
        })
    }
    
    
    return(
        <form id="add-url" onSubmit={() => handleAddBookmark() }>
            <div className="field">
                <label>Name of new bookmark:</label>
                <input type="text" onChange={ (e) => setName(e.target.value) }/>
            </div>                
            <div className="field">
                <label>URL:</label>
                <input type="url" onChange={ (e) => setUrl(e.target.value) }/>
            </div>
            <div className="field">
                <label>Note:</label>
                <input type="text" onChange={ (e) => setNote(e.target.value) } />
            </div>
            <div className="field">
                <label>Tags:</label>
                <input type="text"></input>
            </div>
            <button>Add Bookmark</button>
        </form>
    )
}

export default AddBookmark;