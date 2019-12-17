import React, { FunctionComponent } from "react"

const Loading: FunctionComponent = () => {
    return (
        <div className="loading-wrapper">
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
