import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TAG } from '../graphql/mutations';
import { LAOD_TAGS_FOR_TAGLIST } from '../graphql/queries';

function AddTag(props) {
    const [ name, setName ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ addTag, { addTagData } ] = useMutation(ADD_TAG);
    const { loading, data, error } = useQuery(LAOD_TAGS_FOR_TAGLIST, {
        variables: {
            id: props.id
        }
    })


    useEffect(() => {
        if (data){
            setTags(data.tagList);
        }
    }, [data, addTagData])

    if (loading) return <div>Loading tags...</div>
    if (error) return <div>`Error fetching tags: ${ error.message}`</div>

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
            <label>Name of new tag:</label>
            <input type="text" onChange={ (e) => setName(e.target.value) } />
            <button id="btnCmd" onClick={() => handleAddTag()} >Add tag</button>
        </div>
    )
}

export default AddTag;