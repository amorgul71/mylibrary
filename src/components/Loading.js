import React from 'react'

const Loading = (props) => {
  return (
    <div 
    style={{
        width: "100vw",
        height:"100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
    >
        <div  style={
    {
        width:"50px",
        height:"50px"
    }
  }
        className="spinner-border text-primary" role="status">
  <span 
 
  className="sr-only">Loading...</span>
    </div>
    </div>
  )
}

export default Loading