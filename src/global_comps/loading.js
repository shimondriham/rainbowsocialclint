import React from 'react'

const Loading = () => {
    const style={top:0,
         left:0,
         height:"100vh",
         width:"100%", 
         position:"fixed" ,
         zIndex:999,
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
         background:' rgba(255, 255, 255, 0.466)'
         }

    return (
        <React.Fragment>
            <div>
            <div style={style} ><iframe title="Loading" height={500} src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40"  frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
            </div>
        </React.Fragment>
    )
}

export default Loading