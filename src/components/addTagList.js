import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TAG_LIST } from '../graphql/mutations';
import { LOAD_TAGLISTS } from '../graphql/queries';

function AddTagList() {
    let input;
    const [ name, setName ] = useState('');
    const [ addTagList, { data } ] = useMutation(ADD_TAG_LIST);

    const handleAddTagList = () => {
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
             <label>Tag list name:</label>
             <input type="text" onChange={ (e) => setName(e.target.value) } />

            <button onClick={() => handleAddTagList()} style={{
                color: 'white',
                backgroundColor: '#4f66cc',
                borderRadius: '20px',
                padding: '10px',
                marginLeft: '100px'
            }}>Add tag list</button>
        </div>
    );
}

export default AddTagList;
