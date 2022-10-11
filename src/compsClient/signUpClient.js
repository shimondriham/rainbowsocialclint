import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';

function SignUpClient(props) {
    let nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();

    const onSubForm = (data) => {
        doApi(data)

    }
    const doApi = async (_dataBody) => {
        let url = API_URL + "/users";
        try {
            let resp = await doApiMethod(url, "POST", _dataBody);
            if (resp.data._id) {
                toast.success("You logged in");
                nav("/login");
            }
        }
        catch (err) {
            if (err.response.data.code === 11000) {
                toast.error("Email already in system , try log in")
            }
            else {
                toast.error(JSON.stringify(err.response.data));
                console.log(err.response.data)
            }
        }
    }

    let nameRef = register("name", { required: true, minLength: 2 });
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })
    let passwordRef = register("pass", { required: true, minLength: 3 });
    let addressRef = register("address", { required: false, minLength: 2 });
    let phoneRef = register("phone", { required: false, minLength: 9 });
    let aboutRef = register("about", { required: true, minLength: 15 });
    let genderRef = register("gender", { required: false });
    // const handleChange=(event)=>{
    //     console.log({value: event.target.value});
    //     // alert("sadasdas")
    //   }
    return (
        <div className='container col-md-6 mx-auto py-5 '>
            <h1 className='pt-5'>Sign up to the our social media</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border'>
                <label><i className="fa fa-user" aria-hidden="true"></i> Name:</label>
                <input {...nameRef} type="text" className='form-control' />
                {errors.name ? <small className='text-danger d-block'>* Enter valid name, min 2 chars</small> : ""}
                <label><i className="fa fa-envelope" aria-hidden="true"></i>  Email:</label>
                <input {...emailRef} type="text" className='form-control' />
                {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}
                <label><i className="fa fa-lock" aria-hidden="true"></i> Password:</label>
                <input {...passwordRef} type="password" className='form-control' />
                {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
                <label><i className="fa fa-address-card-o" aria-hidden="true" ></i> Address:</label>
                <input {...addressRef} type="text" className='form-control' placeholder='not required' />
                {errors.address ? <small className='text-danger d-block'>* Enter valid address, min 2 chars</small> : ""}
                <label><i className="fa fa-phone-square" aria-hidden="true"></i> Phone:</label>
                <input {...phoneRef} type="text" className='form-control' placeholder='not required' />
                {errors.phone ? <small className='text-danger d-block'>* Enter valid phone number, min 9 numbers</small> : ""}
                <label> Gender:</label>
                <select 
                {...genderRef} 
                className="form-select" 
                >
                    <option value="man" >Man</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>     
                <label> About:</label>
                <textarea {...aboutRef} type="text" className='form-control' rows="4" />
                {errors.about ? <small className='text-danger d-block'>* Enter valid about , min 15 numbers</small> : ""}           
                <button style={{ fontFamily: "cursive" }} className='btn btn-info mt-4 mx-2 px-3'>Sign up <i className="fa fa-sign-in mx-1" aria-hidden="true"></i></button>
            </form>
        </div>
    )
}

export default SignUpClient