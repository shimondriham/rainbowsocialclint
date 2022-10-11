
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import ItemComment from './itemComment';
import ItemPost from './itemPost';
import { RiUserFollowLine,RiUserUnfollowLine } from 'react-icons/ri';
// import { ItemProfile } from './itemProfile';

function Profile(props) {
    let [ar, setAr] = useState([]);
    let [flag, setflag] = useState(false);
    // let [flagI, setflagI] = useState(false);
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        doApi();    
        onFollower();
      
        
    }, [id,user._id])

    const onFollower = async () => { 
        try {
            let url = API_URL + "/users/followers/" + user._id
            let { data } = await doApiGet(url)  
            console.log(data);
            setflag(data ? true : false)       
        } catch (error) {
            console.log(error);
        }
        // ifI();
    }

    // const ifI = async () => { 
    //     try {
    //         let url = API_URL + "/users/ifI/" + user._id
    //         let { data } = await doApiGet(url)  
    //         console.log(data);
    //         if(data) {
    //          setflag(data) 
    //          setflagI(data)             
    //         } 
    //         else
    //          setflag(data) 
                  
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const doApi = async () => {
        try {
            let url = API_URL + '/users/userInfo/' + id;
            let { data } = await doApiGet(url)
            
            setUser(data);
          
            data.post.forEach( (item) => {
                doApiPost(item)
                // console.log(item);
            });
           
        } catch (error) {
            console.log(error.response);
        }
    }

    const doApiPost = async (item) => {

        try {
            let url = API_URL + '/posts/post-info/' + item;
            let { data } = await doApiGet(url)
            // console.log(data); 
          
            setAr((pre) => [...pre, data])
            // setAr([ data])
        } catch (error) {
            console.log(error.response);
        }
    }
    
    const doApiPut = async () => {
        try {
            let url = API_URL + '/users/addfollowers' ;
            let body={followers:[user._id]};
            let { data } = await doApiMethod(url,"PUT",body);
            console.log(data);
            if(data.flagI == true){
                setflag(true)
            }else{
                if(data.flag==false){
                setflag(true)
            }
            else setflag(false)  
            }
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <div className='container-fluid profile ' style={{Height:"100%"}}>
            <div className='container pt-5 '>
                <div className='shadow mt-5 p-4 profileName'>             
                    <div className='float-end d-flex align-items-center'>                 
                    <h2 className='mb-5 mx-3'>                          
                    {user.name}  
                    </h2>                      
                    <h2 className='mb-5 mx-3 mt-3 '> 
                      {/* {flagI ? "I" :  "N"} */}
                      {flag ?
                        <button className='float-start bg-transparent border-0'    onClick={()=>{  doApiPut()  }}>
                        <RiUserFollowLine />  </button>
                      : 
                      <button className='float-start bg-transparent border-0' onClick={()=>{  doApiPut() }}>
                        <RiUserUnfollowLine /> </button>
                     }
                                                                        
                    </h2>
                    <div>                   
                     </div>                
                        <img className='shadow' width={80} src={user.gender === "man" ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" : user.gender === "female" ? "https://media.istockphoto.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=20&m=477333976&s=170667a&w=0&h=0MKAqzspB2Tcx7Yf42nYI0Pda9qK1oZap25Mru21K40=" : ""} alt="avatar" />
                      
                    </div>
                   
                   
                    <h3>
                        About:  {user.about}
                    </h3>
                    <h4>Joined Date: {user.creatDate?.substring(0, 10)}</h4>
                    <h4>BirthDay: {user.BirthDay?.substring(0, 10)}</h4>
                </div>
                <div className=' '>
                    <h1 className='text-center m-5 welcome'>~ post list ~</h1>
                    {ar.length > 0 ? ar.map((item,i) => (

                        <ItemPost key={i} item={item} ar={ar} />
                    )) : <h2 className='h1 text-center fw-bolder'>NO POSTS YET</h2>}
                </div>
            </div>
        </div>

    )
}

export default Profile