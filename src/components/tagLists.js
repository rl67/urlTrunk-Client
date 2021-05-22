import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { LOAD_TAGLISTS } from '../queries/queries';
import LoadTagsForTagList from './loadTagsForTagList';

function TagLists() {
    const [ tagListSelected, SetTagListSelected ] = useState('6081b6e4fa6a712aadae777a');
    const [tLists, setTLists] = useState([]);

    const handleTagListsClick = (tList) => { // eslint-disable-next-line
        SetTagListSelected(tList.id);
    }

    const { loading, data, error } = useQuery(LOAD_TAGLISTS);
    
    useEffect(() => {
        if(data){
            setTLists(data.tagLists)
        }
    }, [data]);

    if (loading) return <div>Loading tag lists...</div>;
    if (error) return <div>{ `Error: ${ error.message }` }</div>;
    
    return (
        <div className="tagList">
            <h2>Tag Lists</h2>
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
            <LoadTagsForTagList id={ tagListSelected} />
        </div>
    );
}

export default TagLists;