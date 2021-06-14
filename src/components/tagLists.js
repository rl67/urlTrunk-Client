import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { LOAD_TAGLISTS } from '../graphql/queries';

function TagLists(props) {
    const [ tLists, setTLists] = useState([]);                  // Hold tag lists loaded from db
    const { loading, data, error } = useQuery(LOAD_TAGLISTS);

    const handleTagListsClick = (tList) => { // eslint-disable-next-line
        props.getClickedTagList(tList);                         // Lift state to parent, which list is clicked
    }

    
    // Populate data base data to the DOM
    useEffect(() => {
        if(data){
            setTLists(data.tagLists)
        }
    }, [data]);

    if (loading) return <div>Loading tag lists...</div>;
    if (error) return <div>{ `Error: ${ error.message }` }</div>;
    
    return (
        <div className="tagList">

            {tLists.map(tList => (
                <div className="tagList-preview" key={tList.id}>
                    <button onClick={() => handleTagListsClick(tList)} style={{
                        color: 'black',
                        backgroundColor: '#37be64',
                        borderRadius: '20px',
                        padding: '10px'
                        }}>{ tList.name }
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TagLists;