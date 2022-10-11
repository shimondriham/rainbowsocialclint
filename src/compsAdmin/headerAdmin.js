import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderAdmin(props) {
    let nav = useNavigate()

    const onLogOutClick = () => {
        if(window.confirm("Are you sure you want to logout?")){
          nav("/admin/logout");
        }
      }

    return (
        <div className='container-fluid bg-dark header_admin p-2'>
            <div className='container d-flex align-items-center'>
   
                <div className='col-auto me-4'><Link to="/admin/users" className='text-light' ><h2 className=' col-auto me-4' style={{color:"pink"}}>Admin panel</h2></Link></div>
                <nav className='col-md-9 '>
                <Link className='h4'  to="/admin/users" > Users</Link>|
                <Link className='h4  mx-2' to="/admin/posts" > Posts</Link>|
                {/* <Link to="/admin/comments" > Comments</Link> */}
                {/* <Link className='h4' to="/admin/messages" > Messages</Link> */}
                </nav>
                {localStorage["token_social"] ? 
        <button onClick={onLogOutClick} className='badge bg-danger float-md-end '><i className="fa fa-sign-out" aria-hidden="true"></i> Log out</button> : "" }
            </div>

        </div>
    )
}

export default HeaderAdmin