import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../global_comps/authAdminComp';
import PageLinks from '../global_comps/pageLinks';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';


function UserListAdmin(props) {
    const [ar, setAr] = useState([]);
    const [numPage, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const nav =useNavigate();
    const location = useLocation()
    useEffect(() => {
        doApi()
    }, [location])

    const doApi = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let pageQuery = urlParams.get("page") || 1;
        setPageNum(pageQuery)
        let url = API_URL + "/users?page=" + pageQuery;
        try {
            setLoading(true)
            let resp = await doApiGet(url);
            console.log(resp.data);
            setAr(resp.data);
            setLoading(false)
        }
        catch (err) {
           
            if (err.response) {
               toast(err.response.data.err)
            }
        }
    }


    const delUser = async (_idDel) => {
        if (window.confirm("Are you sure you want to delete?")) {
            let url = API_URL + "/users/" + _idDel
           let data= await doApiMethod(url, "DELETE", {});
           console.log(data);
            doApi()
        }
    }

    // change role user for admin or back to regular user
    const changeRole = async (_userId, _role) => {
        let url = API_URL + `/users/changeRole/${_userId}/${_role}`;
        try {
            let resp = await doApiMethod(url, "PATCH", {});
            if (resp.data.modifiedCount) {
                doApi();
            }
        }
        catch (err) {
            // alert("there problem come back later")
            if (err.response) {
                toast(err.response.data.err)
            }
        }
    }
    return (
        <div className='container'>
            <AuthAdminComp />
            <h1>List of Users in system</h1>
            
             <PageLinks perPage="5" apiUrlAmount={API_URL + "/users/amount"} urlLinkTo={"/admin/users"} clsCss="btn btn-info me-1" />
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th>Role</th>
                        <th>Messages</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{(i + 1) + 5 * (numPage - 1)}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td><img style={{width:'10%'}} src={item.gender==="man"?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png":item.gender==="female"?"https://media.istockphoto.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=20&m=477333976&s=170667a&w=0&h=0MKAqzspB2Tcx7Yf42nYI0Pda9qK1oZap25Mru21K40=":item.gender==="other"?"":"https://cdn.pixabay.com/photo/2017/09/08/21/50/yin-2730339__340.png"} alt={item.url_title} /></td>
                                <td>
                                    {(item.role === "admin") ?
                                        <button onClick={() => {
                                            changeRole(item._id, "user")
                                        }} className='btn btn-warning'>admin</button>
                                        :
                                        <button
                                            onClick={() => {
                                                changeRole(item._id, "admin")
                                            }}
                                            className='btn btn-dark'>user</button>
                                    }

                                </td>
                                <td><button onClick={() => {
                                    nav("/admin/messages/" + item._id)
                                }} className='badge bg-info'>Messages</button></td>
                                <td>
                                    <button onClick={() => { delUser(item._id) }} className='badge bg-danger'>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {loading ? <img src='https://media.giphy.com/media/11ASZtb7vdJagM/giphy.gif' /> : ""}
            {ar.length===0 &&!loading? <h2>No More Users</h2> : ""}
        </div>
    )
}

export default UserListAdmin