import React, { useEffect, useState } from 'react'
import  {reverse  } from 'lodash'
import { useParams } from 'react-router-dom';
import AuthAdminComp from '../global_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import Loading from '../global_comps/loading';

const MessageListAdmin = () => {
const [ar,setAr]=useState([]);
const urlParams=useParams();
let [userObj, setUserObj] = useState({})
const [loading, setLoading] = useState(false);

useEffect(()=>{
   
    doApiMessages();
},[urlParams.id])

const doApiMessages=async()=>{
    let urlUsers = API_URL+"/users/all_users/";
    setLoading(true);
    let resp = await doApiGet(urlUsers);
    let temp_ar = resp.data;
    let users_ar = {};
    temp_ar.forEach(item => {
        users_ar[item._id] = item.name;     
    })
    setUserObj(users_ar);
    let url=API_URL+`/messages/${urlParams.id}`;
    let {data}=await doApiGet(url)
    reverse(data);
    setAr(data);
    setLoading(false);
    
}

const delMessage = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
        let url = API_URL + "/messages/" + _idDel
       let resp= await doApiMethod(url, "DELETE", {});
       console.log(resp);
       if (resp.data.dataMessegDel.deletedCount===1) {
       doApiMessages();
        }
    }
}

  return (
    <div className='container'>
    <AuthAdminComp />      
    <h1 >List of comments on this post</h1>
    {/* {loading&&<h1 >Loading...</h1>} */}
    {loading&&<Loading/>}
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Sender Name</th>
                <th>Date Created</th>
                <th>Message</th>
                <th>Del</th>
            </tr>
        </thead>
 
        <tbody>                 
            {ar.map((item, i) => {
                return (
                    <tr key={item._id}>
                        <td>{(i + 1)  }</td>                               
                        <td>{userObj[item.recipient_id]}</td>
                        <td>{userObj[item.sender_id]}</td>
                        <td>{item.date_created.substring(0,item.date_created.indexOf("T"))}</td>
                
                        <td title={item.Message}>{item.Message.substring(0,13 )+"..."}</td>
                        <td>
                            <button onClick={() => { delMessage(item._id) }} className='badge bg-danger mx-1'>X</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    {/* {loading ? <h2>Loading...</h2> : ""} */}
    {/* {ar.length===0 &&!loading? <h2>No More Posts</h2> : ""} */}
</div>

  )
}

export default MessageListAdmin