import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
// import {AppContext} from '../context/contextAdmin';

import AuthAdminComp from '../global_comps/authAdminComp';
import { toast } from 'react-toastify';
import Loading from '../global_comps/loading';
import { reverse } from 'lodash';
// import PageLinks from '../global_comps/pageLinks';

function CommentListAdmin(props){
    let location = useLocation();
    let [ar, setAr] = useState([]);
    let [numPage, setPageNum] = useState(1);
    let [userObj, setUserObj] = useState({})
    let [loading, setLoading] = useState(false);
    let urlParams=useParams();
    
    useEffect(() => {
        doApi();
    }, [location])

    const doApi = async () => {
        try {
            setLoading(true)
            let url2 = API_URL+"/users/all_users/";
            let resp2 = await doApiGet(url2);
            let temp_ar = resp2.data;
            let users_ar = {};
            temp_ar.forEach(item => {
                users_ar[item._id] = item.name;     
                setUserObj(users_ar);
            })
            let url1 = API_URL+"/comments/"+urlParams.id;
            let {data}= await doApiGet(url1);

            setAr(data.comments);
          
            setLoading(false)
        }
        catch (err) {
            alert("there problem come back later")
            if (err.response) {
                console.log(err.response.err)
            }
        }
    }
    
    const delPosts = async (_idDel) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                let url = API_URL + "/comments/" + _idDel;
                let resp = await doApiMethod(url, "DELETE", {});
                // console.log(resp.data);
                if (resp.data.deletedCount) {
                    toast.info("Comment delted !");
                }
                doApi();
            }
            catch (err) {
                console.log(err.response);
                alert("there problem , try again later ")
            }
        }
    }
  

    return (
        <div className='container'>
            <AuthAdminComp />      
            <h1 >List of comments on this post</h1>
            {/* <PageLinks perPage="5" apiUrlAmount={API_URL + "/comments/amount/"+urlParams.id} urlLinkTo={"/admin/comments/"+urlParams.id} clsCss="btn btn-info me-1" /> */}

            {ar.length>0?
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Date Created</th>
                        <th>Image</th>
                        <th>Likes</th>
                        <th>Info</th>
                        <th>del</th>
                    </tr>
                </thead>
         
                <tbody>                 
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{(i + 1) + 5 * (numPage - 1)}</td>                               
                                <td>{userObj[item.user_id]}</td>
                                <td>{item.creatDate.substring(0,item.creatDate.indexOf("T"))}</td>
                                <td className='w-25'><img style={{width:'35%'}} src={item.url_img.indexOf('.')!==-1?item.url_img:"https://media.istockphoto.com/photos/error-symbol-picture-id1304548891?b=1&k=20&m=1304548891&s=170667a&w=0&h=2IAvneGPQx1L5jwvQ3za-ieTAlGNLdhuiZ9Wig2ewtY="} alt="image"/></td>
                                <td>{item.likes.length}</td>
                                <td title={item.info_comment}>{item.info_comment.substring(0,13 )+"..."}</td>
                                <td>
                                    <button onClick={() => { delPosts(item._id) }} className='badge bg-danger mx-1'>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>:""}
            {loading ? <Loading/> : ""}
            {ar.length===0 &&!loading? <h2>No More Posts</h2> : ""}
        </div>
    )
}

export default CommentListAdmin
