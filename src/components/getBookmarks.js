import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKMARKS } from '../graphql/queries';

function GetBookmarks(props) {
    const [bookmarks, setBookmarks] = useState([]);
    const { loading, data, error } = useQuery(GET_BOOKMARKS, {
        variables: {
            tags: props.tags
        }
    });

    useEffect(() => {
        console.log(props); //??
        if (data){
            setBookmarks(data.bookmarksByTags);
        }
    }, [data]);

    if (loading) return <div>Loading bookmarks...</div>
    if (error) return <div>`Error fetching bookmarks: ${error.message}`</div>

    return(
        <div className="bookmarks">
            <div className="tagsToSearch">
                
            </div>
            <ul id="bookmark-list">
                { bookmarks.map(bookmark => {
                    return(
                        <li key={ bookmark.id }>
                             <a href={bookmark.url}>{ bookmark.name }</a>
                             <p>{ bookmark.note }</p>
                        </li>
                    )
                    })                
                }   
            </ul>
        </div>
    )
}

export default GetBookmarks;
