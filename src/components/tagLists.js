import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { LOAD_TAGLISTS } from '../graphql/queries';

function TagLists(props) {
    // const [ tagListSelected, setTagListSelected ] = useState('6081b6e4fa6a712aadae777a');
    const [ tLists, setTLists] = useState([]);
    const { loading, data, error } = useQuery(LOAD_TAGLISTS);

    const handleTagListsClick = (tList) => { // eslint-disable-next-line
        // props.getClickedTagList(tList.id);
        props.getClickedTagList(tList);
    }

    
    // Populate data base data to the DOM
    useEffect(() => {
        if(data){
            setTLists(data.tagLists)
            props.getClickedTagList(data.tagLists[0])    // Default tag list is the first one, to avoid null pointer in parent
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