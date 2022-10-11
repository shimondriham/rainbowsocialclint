// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import { checkTokenLocal } from '../services/localService';
import { AiOutlineMenu, AiFillMessage } from 'react-icons/ai';
import { BsMailbox2 } from 'react-icons/bs';

function HeaderClient(props) {
    let nav = useNavigate()
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("none");
    useEffect(() => {
        if (checkTokenLocal()) {
            doApi();
        }
    }, [nav])
    const doApi = async () => {
        try {
            let url = API_URL + "/users/userInfo/"
            let resp = await doApiGet(url)
            // console.log(resp.data);
            setUser(resp.data)

        } catch (error) {
            console.log(error);
        }
    }

    const onLogOutClick = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            nav("/logout");
        }
    }
    return (
        <div className='container-fluid header text-white position-fixed p-3 shadow ' >
            <div className='container d-flex align-items-center '>
                <div className='col-md-1 me-4'> <Link to="/home" > <img src='/images/logorainbow1.png' height={50} alt='logo' /></Link></div>
                {localStorage["token_social"] ? <React.Fragment>
                <nav className='col-md-4 '>
                    <div className='d-flex'>
                        <Link className='mx-2' to="/myFeed" ><i className="fa fa-users" aria-hidden="true"></i> My Feed </Link>
                        <Link className='mx-2' to={"/profile/" + user._id} ><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
                        <Link className='mx-2' to="/addPost" ><i className="fa fa-clipboard" aria-hidden="true"></i> Add Post</Link>
                        <Link className='mx-2' to="/email" ><i className="fa fa-compress" aria-hidden="true"></i> Contact Us </Link>
                       
                    </div>
                </nav>
            
             
               
                    <div className='col-md-6 d-flex '>
                        <span className=' fw-bolder mx-2 welcome  d-none d-md-flex pt-1'> Welcome </span>
                        <span className=' fw-bolder mx-2 welcome d-none d-md-flex pt-1'>{user.name} </span>
                        <span className=' fw-bolder mx-2 welcome  d-none d-md-flex pt-1'> to  </span>
                        <span className='welcome r pt-1'>R</span>
                        <span className='welcome a pt-1'>a</span>
                        <span className='welcome i pt-1'>i</span>
                        <span className='welcome n pt-1'>n</span>
                        <span className='welcome b pt-1'>b</span>
                        <span className='welcome o pt-1'>o</span>
                        <span className='welcome w pt-1'>w</span>
                        <img className='mx-2' src='/images/logorainbow2.png' height={50} alt='logo' />

                    </div>
                    <button className='burgerButton btn  float-end ' onClick={() => {
                        setStyle((pre) => pre === 'none' ? "block" : "none")
                        // console.log(style);
                    }}><AiOutlineMenu /></button>

                    <div className='burger d-md-none ' style={{ display: style }}  >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link  dropdown-item" to={"/home"}><i className='fa fa-home' aria-hidden="true"></i> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  dropdown-item" to={"/profile/" + user._id}><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
                            </li>

                            <li><Link className="nav-link dropdown-item" to="/addPost"><i className="fa fa-clipboard" aria-hidden="true"></i> Add Post</Link></li>
                            <li><Link className="nav-link dropdown-item" to="/email"><i className="fa fa-compress" aria-hidden="true"></i> Contact Us</Link></li>
                            <li className="nav-item">
                                <button className=' btnBurg' onClick={() => {
                                    setStyle((pre) => pre === 'block' ? "none" : "none")
                                }}>
                                    <Link className="nav-link dropdown-item" to="/listChatMessageBurger"><AiFillMessage /> List Chat Message</Link>
                                </button>
                            </li>

                            <li>      <button onClick={onLogOutClick} className=' btn  text-danger'> Log out <i className="fa fa-sign-out" aria-hidden="true"></i></button></li>
                            {/* <li><Link className="nav-link dropdown-item" to="#">Something else here</Link></li> */}

                        </ul>

                    </div>
                    <button onClick={onLogOutClick} className=' float-md-end btn col-md-1 navLink'> Log out <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </React.Fragment>
                    :
                    <div className=''>
                        <Link className='mx-2 navLinkSm' to="/" ><i className="fa fa-sign-in" aria-hidden="true"></i> login</Link>
                        <Link className='mx-2 navLinkSm' to="/signup" ><i className="fa fa-user-plus" aria-hidden="true"></i> SignUp</Link>
                    </div>
                }

            </div >

        </div>
    )
}

export default HeaderClient
