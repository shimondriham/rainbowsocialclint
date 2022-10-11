import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';

const  Authclient = () => {
    let nav = useNavigate();
    useEffect(() => {
      if(localStorage["token_social"]){
        doApi()
      }
      else{
        nav("/logout")
      }
    },[])
    const doApi = async() => {
        try{
            let url = API_URL + "/users/checkToken";
            let resp = await doApiGet(url)
            // console.log(resp.data.msg);
        if(resp.data.msg ){
          nav("/logout")
        }
      }
      catch(err){
        alert("You must be user to be here! or you need to login again 2222")
        nav("/login")
      }
    }

  return (
    <React.Fragment></React.Fragment>
  )
}

export default Authclient