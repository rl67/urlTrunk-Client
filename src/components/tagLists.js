import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { LOAD_TAGLISTS } from '../graphql/queries';
import { RiCloseCircleLine } from "react-icons/ri";

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
                    <div onClick={ () => handleTagListsClick(tList) } key={ tList.id } >
                        { tList.name } <RiCloseCircleLine onClick={() => (console.log(tList.name))} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TagLists;