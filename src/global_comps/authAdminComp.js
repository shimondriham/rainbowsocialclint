import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';

function AuthAdminComp(props){
  let nav = useNavigate();
  useEffect(() => {
    if(localStorage["token_social"]){
      doApi()
    }
    else{
      toast.error("You must be admin to be here! or you need to login again")
      nav("/admin")
    }
  },[])


  const doApi = async() => {
      try{
          let url = API_URL + "/users/userInfo";
          let resp = await doApiGet(url)
      if(resp.data.role !=="admin"){
        toast.error("You must be admin to be here! or you need to login again 3333")
        nav("/admin/logout")
      }
    }
    catch(err){
      alert("You must be admin to be here! or you need to login again 2222")
      nav("/admin/logout")
    }
  }


  return(
    <React.Fragment></React.Fragment>
  )
}

export default AuthAdminComp
