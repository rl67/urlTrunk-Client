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
        if (data){
            setBookmarks(data.bookmarksByTags);
        }
    }, [data]);

    if (loading) return <div>Loading bookmarks...</div>
    if (error) return <div>`Error fetching bookmarks: ${error.message}`</div>

    console.log(bookmarks); //??
    return(
        <div className="bookmarks">
            { <h2>Bookmarks for selected tags</h2> }
            <ul id="bookmark-list">
                { bookmarks.map(bookmark => {
                    return(
                        <li key={ bookmark.id }>
                             <a href={ bookmark.url }
                                target="_blank">{ bookmark.name }</a>
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
