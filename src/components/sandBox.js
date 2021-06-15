import React from 'react'

function SandBox(props) {
    return (
        <div>
            { props.tags.map((tag) => {
                <div className="tags" key={ tag.id }>
                    { tag.name }
                </div>
            })}
        </div>
    )
}

export default SandBox
