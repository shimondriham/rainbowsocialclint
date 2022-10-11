import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../services/localService';

function LogoutAdmin(props) {
    let nav = useNavigate();

    useEffect(() => {
        deleteToken();
        toast.info("You logged out from system , see you soon!")
        nav("/admin");
    }, [])

    return (
        <div></div>
    )
}


export default LogoutAdmin