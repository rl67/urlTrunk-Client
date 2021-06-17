import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TAG_LIST } from '../graphql/mutations';
import { LOAD_TAGLISTS } from '../graphql/queries';

function AddTagList(props) {
    const [ name, setName ] = useState('');
    const [ addTagList, { data } ] = useMutation(ADD_TAG_LIST);

    const handleAddTagList = () => {
        props.newTagList(true);     // ti init a new render of the main page
        addTagList({
            variables: {
                name: name
            },
            refetchQueries: [
                {query: LOAD_TAGLISTS }
            ]
        })
    }

    return( 
        <div className="addTagList">
            <label>Name of new tag list:</label>
            <input type="text" onChange={ (e) => setName(e.target.value) } />

            <button id="btnCmd" onClick={() => handleAddTagList()} >Add tag list</button>
        </div>
    );
}

export default AddTagList;
