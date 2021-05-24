import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TAG } from '../graphql/mutations';
import { LAOD_TAGS_FOR_TAGLIST } from '../graphql/queries';

function AddTag(props) {
    const [ name, setName ] = useState('');
    const [ addTag, { data } ] = useMutation(ADD_TAG);
    const { loadTagsData } = useQuery(LAOD_TAGS_FOR_TAGLIST, {
        variables: {
            id: props.id
        }
    })

    const handleAddTag = () => {
        addTag({
            variables: {
                name: name,
                tagListId: props.id
            },
            refetchQueries: [
                { query: LAOD_TAGS_FOR_TAGLIST, 
                    variables: {
                        id: props.id
                    }
                }
            ]
        })
    }

    return(
        <div className="addTag">
            <label>Tag name:</label>
            <input type="text" onChange={ (e) => setName(e.target.value) } />

            <button onClick={() => handleAddTag()} style={{

            }}>Add tag</button>
        </div>
    )
}

export default AddTag;