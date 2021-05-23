import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_TAGS } from '../graphql/queries';

function Tags() {
    const [tags, setTags] = useState([]);
    const { loading, data, error } = useQuery(LOAD_TAGS);

    useEffect(() => {
        if(data){
            setTags(data.tags);
        }
    }, [data])
    
    if (loading) return <div>Loading tags...</div>
    if (error) return <div>{ `Error ${ error.message }` }</div>
    
    return ( 
        <div className="tags">
            <h2>Tags in ...</h2>
            {tags.map(tag => (
                <div className="tags-preview" key={ tag.id }>
                    <button style={{
                        color: 'black',
                        backgroundColor: '#b95688',
                        borderRadius: '20px',
                        padding: '10px'
                    }}>{ tag.name }</button>
                </div>
            ))}
        </div>
    );
}
 
export default Tags;
