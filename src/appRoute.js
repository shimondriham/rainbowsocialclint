import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LayoutAdmin from './compsAdmin/layoutAdmin';
import LoginAdmin from './compsAdmin/loginAdmin';
import HomeClient from './compsClient/homeClient';
import LayoutClient from './compsClient/layoutClient';
import LogInClient from './compsClient/loginClient';
import MyFeed from './compsClient/myFeed';
import LogoutClient from './compsClient/logoutClient';
import SignUpClient from './compsClient/signUpClient';
import Page404 from './global_comps/page404';
import 'react-toastify/dist/ReactToastify.css';
import UserListAdmin from './compsAdmin/userlistAdmin';
import LogoutAdmin from './compsAdmin/logoutAdmin';
import PostListAdmin from './compsAdmin/postListAdmin';
import CommentListAdmin from './compsAdmin/commentListAdmin';
import { AppContext } from './context/contextAdmin';
import {clientContext} from './context/contextClient';
import { API_URL, doApiGet } from './services/apiService';
import AddPost from './compsClient/addPost';
import Profile from './compsClient/profile';
// import ListMessage from './compsClient/listMessage';
import { checkTokenLocal } from './services/localService';
import ListChatMessage from './compsClient/listChatMessage';
import MessageListAdmin from './compsAdmin/messageListAdmin';
import ListChatMessageBurger from './compsClient/listChatMassageBurger';
import Searchpic from './compsClient/searchpic';
import Email from './compsClient/email';
// import Pixa from './compsClient/serchImg';


function AppRoute(props) {
    let [ar, setAr] = useState([]);
    let [search, setSearch] = useState("");

    useEffect(()=>{
        if(checkTokenLocal()) {
           
            doApi();
        }
    },[])
    const doApi = async () => {
        try {
            let url2 = API_URL+"/users/all_users/"; 
            let {data} = await doApiGet(url2);
            setAr(data)
            
        } catch (error) {
            console.log(error);
        }
      
    }

    return (
        <Router>
             <AppContext.Provider value={ar=ar}>
             <clientContext.Provider value={{search:search ,setSearch:setSearch}} >
            <Routes>
                <Route path="/admin" element={<LayoutAdmin />}>
                    <Route index element={<LoginAdmin />} />
                    <Route path='/admin/users' element={<UserListAdmin />} />                               
                    <Route path='/admin/posts' element={<PostListAdmin />} />                               
                    <Route path='/admin/comments/:id' element={<CommentListAdmin />} />                               
                    <Route path='/admin/messages/:id' element={<MessageListAdmin />} />                               
                    <Route path='/admin/logout' element={<LogoutAdmin/>} />                               
                                          
                </Route>

                <Route path="/" element={<LayoutClient />}>
                    <Route index element={<LogInClient />} />
                    <Route path="/signup" element={<SignUpClient/>}  />
                    <Route path="/home" element={<HomeClient />} />
                    <Route path="/logout" element={<LogoutClient />} />
                    <Route path="/addPost" element={<AddPost/>} />
                    <Route path="/searchpic" element={<Searchpic/>} />
                    <Route path="/myFeed" element={<MyFeed/>} />
                    <Route path="/profile/:id" element={<Profile/>} />
                    <Route path="/email/" element={<Email/>} />
                    <Route path="/listChatMessage" element={<ListChatMessage/>} />
                    <Route path="/listChatMessageBurger" element={<ListChatMessageBurger/>} />
                    <Route path="/*" element={<Page404/>} />
                </Route>
            </Routes>
            <ToastContainer position="top-right" theme='colored' />
        </clientContext.Provider>
        </AppContext.Provider>
        </Router>
    )
}

export default AppRoute