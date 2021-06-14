import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKMARK } from '../graphql/mutations';

function AddBookmark(props){
    const [ name, setName ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ note, setNote ] = useState('');
    //es-lint ignore
    const [ addBookmark, { data } ] = useMutation(ADD_BOOKMARK);    

    const handleAddBookmark = () => {
        console.log(props.tags);//??
        addBookmark({
            variables: {
                name: name,
                url: url,
                note: note,                
                tags: props.tags,
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
            <button style={{
                borderRadius: '10px',
                padding: '10px',
                marginLeft: '20px'
            }}>Add Bookmark</button>
        </form>
    )
}

export default AddBookmark;