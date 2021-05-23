import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { LOAD_TAGLISTS } from '../graphql/queries';
import LoadTagsForTagList from './loadTagsForTagList';
import AddTagList from './addTagList';

function TagLists() {
    const [ tagListSelected, setTagListSelected ] = useState('6081b6e4fa6a712aadae777a');
    const [ tLists, setTLists] = useState([]);
    const { loading, data, error } = useQuery(LOAD_TAGLISTS);

    const handleTagListsClick = (tList) => { // eslint-disable-next-line
        setTagListSelected(tList.id);
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
            <h2>Tag Lists</h2>
            <div className="addTagList">
                <AddTagList />
            </div>
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