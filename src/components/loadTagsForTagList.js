import { useState, useEffect } from 'react';
import AddTag from '../components/addTag';
import { useQuery } from '@apollo/client';
import { LAOD_TAGS_FOR_TAGLIST} from '../graphql/queries';
import AddUrl from './addBookmark';
import AddBookmark from './addBookmark';
import GetBookmarks from './getBookmarks';

function LoadTagsForTagList(props){
    const [tags, setTags] = useState([]);
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

    const tagList = [    
        "609d7e331b152b6fc5cd0ae4",
        "609d7e4c1b152b6fc5cd0ae5"
    ];

    return(
        <div className="tags">
            <h2>Tags in { data.tagList.name }</h2>
            <div className="addTag">
                <AddTag id={ props.id }/>
            </div>
            { tags.map(tag => (
                <div className="tagList" key={ tag.id }>
                    <button style={{
                        color: 'black',
                        backgroundColor: '#b95688',
                        borderRadius: '20px',
                        padding: '10px'
                    }}>{ tag.name }</button>
                </div>
            ))}
            <div className="searchUrl">
                <AddBookmark />
            </div>
            <div className="getBookmarks">
                <GetBookmarks tags={ tagList } />
            </div>
        </div>
    )
}

export default LoadTagsForTagList;