import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AuthAdminComp from '../global_comps/authAdminComp';
import PageLinks from '../global_comps/pageLinks';
import Loading from '../global_comps/loading';
// import { reverse,orderBy, sortBy } from 'lodash';


function PostListAdmin(props) {
    let [ar, setAr] = useState([]);
    let [numPage, setPageNum] = useState(1);
    let [userObj, setUserObj] = useState({})
    let [loading, setLoading] = useState(false);
    let location = useLocation()
    let nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [location])

    const doApi = async () => {
        try {
            let url2 = API_URL+"/users/all_users/";
            setLoading(true)
            let resp2 = await doApiGet(url2);
            let temp_ar = resp2.data;
            let users_ar = {};
            temp_ar.forEach(item => {
                users_ar[item._id] = item.name;  
                setUserObj(users_ar)
            })
            console.log(users_ar);
            const urlParams = new URLSearchParams(window.location.search);
            let pageQuery = urlParams.get("page") || 1;
            setPageNum(pageQuery)
            let url = API_URL + "/posts?page=" + pageQuery;
            let resp = await doApiGet(url);
            setAr(resp.data);
            setLoading(false)

        }
        catch (err) {
            alert("there problem come back later ")
            if (err.response) {
                console.log(err.response.data)
            }
        }
    }
   

    const delPosts = async (_idDel) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                let url = API_URL + "/posts/" + _idDel;
                let resp = await doApiMethod(url, "DELETE", {});
                console.log(resp.data);
                if (resp.data.deletedCount) {
                    toast.info("Post delted !");
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
        
            <h1 >List of Posts in system</h1>
          
             <PageLinks perPage="5" apiUrlAmount={API_URL + "/posts/amount"} urlLinkTo={"/admin/posts"} clsCss="btn btn-info me-1" />
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>likes</th>
                        <th>postMessage</th>
                        <th>user name</th>
                        <th>date_created</th>
                        <th>Image</th>
                        <th>comments</th>
                        {/* <th>Messages</th> */}
                        <th>del</th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{(i + 1) + 5 * (numPage - 1)}</td>
                                <td>{item.title}</td>
                                <td>{item.likes.length}</td>
                                <td>{item.postMessage}</td>
                                <td>{userObj[item.user_id]}</td>
                                <td>{item.date_created.substring(0,item.date_created.indexOf("T"))}</td>
                                <td><img style={{width:'35%'}} src={item.url_img?item.url_img:"https://media.istockphoto.com/photos/error-symbol-picture-id1304548891?b=1&k=20&m=1304548891&s=170667a&w=0&h=2IAvneGPQx1L5jwvQ3za-ieTAlGNLdhuiZ9Wig2ewtY="} alt={item.url_title} /></td>
                                <td><button onClick={() => {
                                    nav("/admin/comments/" + item._id)
                                }} className='badge bg-info'>comments</button></td>
                                
                                <td>
                                    <button onClick={() => { delPosts(item.short_id) }} className='badge bg-danger mx-1'>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {loading ? <Loading/> : ""}
            {ar.length===0 &&!loading? <h2>No More Posts</h2> : ""}
        </div>
    )
}

export default PostListAdmin