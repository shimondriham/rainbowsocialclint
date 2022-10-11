import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderClient from './headerClient';
import "../css/client.css"
import Authclient from '../global_comps/authclient';
import ClientFooter from './ClientFooter';

function LayoutClient(props) {
    return (
        <div className='layout'>
            {/* <Authclient/> */}
            <HeaderClient/>
            <Outlet/> 
            <ClientFooter/>     
        </div>
    )
}

export default LayoutClient
