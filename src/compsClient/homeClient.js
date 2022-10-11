import React from 'react';
import Authclient from '../global_comps/authclient';
import ListChatMessage from './listChatMessage';
import ListPost from './listPost';

function HomeClient(props){
    return(
        <div className=' home'>
            <div className='container'>

            
             <div style={{ height: "80px" }}>
            </div>
        <div className=' row'>
            <div className='col col-md-4 '>
                <ListChatMessage/>
            </div>
            <div className='col-md-8 '>
               <ListPost/>
            </div>
         </div>  
        </div> 
        </div> 
        
    )
}

export default HomeClient