import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LAOD_TAGS_FOR_TAGLIST} from '../graphql/queries';

function LoadTagsForTagList(props){
    const [ tagSelected, setTagSelected ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const { loading, data, error } = useQuery(LAOD_TAGS_FOR_TAGLIST, {
        variables:{
            id: props.id
        },
    });

    useEffect(() => {
        if (data){
            setTags(data.tagList.tags);
        }
    }, [data]);

    if (loading) return <div>Loading tags...</div>
    if (error) return <div>`Error fetching tags for tag list: ${ error.message }`</div>

    const handleTagClick = (tag) => {
        setTagSelected(tag.id);
        props.getClickedTag(tag);
    }

    return(
        <div className="tags">
            { tags.map(tag => (
                <div className="tagList" key={ tag.id }>
                    <button onClick={() => handleTagClick(tag)} style={{
                        color: 'black',
                        backgroundColor: '#b95688',
                        borderRadius: '20px',
                        padding: '10px'
                    }}>{ tag.name }</button>
                </div>
            ))}
        </div>
    )
}

export default LoadTagsForTagList;