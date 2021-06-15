import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LAOD_TAGS_FOR_TAGLIST} from '../graphql/queries';
import { RiCloseCircleLine} from 'react-icons/ri';
import { assertAbstractType } from 'graphql';

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
                <div className="tags-preview" key={ tag.id }>
                    <div onClick={ () => handleTagClick(tag)} key={ tag.id }>
                        { tag.name } <RiCloseCircleLine onClick={() => (console.log(tag.name)) }/>
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default LoadTagsForTagList;