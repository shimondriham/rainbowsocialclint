import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../global_comps/loading';
import {clientContext} from '../context/contextClient';

const Searchpic = () => {
    let Access_Key = "3zdRCFN-NFUexlSidqFBEz1TPmjPoLpK2FxMqh18Gx8"
    let {search,setSearch}  = useContext(clientContext)
    const [img, setImg] = useState("Flower");
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const [page, setPage] = useState(1);

    const doApiPic = async () => {
        try {
            setLoading(true)
            // https://pixabay.com/api/?key=15489555-318fcca1200a48f374a1ce3ea&q=${searchQ}&image_type=photo&pretty=true
            let url = `https://api.unsplash.com/search/photos?page=${page}&query=${img}&client_id=${Access_Key}`
            let { data } = await axios.get(url)
            // console.log(data.results);
            setRes(data.results);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {
        doApiPic();
    }, [page]);// eslint-disable-line react-hooks/exhaustive-deps

    const submit = () => {
        doApiPic();
    };

    return (
        <div style={{ height: "100%", padding: "100px" }}>
            <nav className='d-flex mt-2'>
                <label style={{fontFamily:"serif",color:"rgb(148, 87, 87)"}} className='fw-bolder mx-3 my-1 h3'  >Page : </label>
                <ul className="pagination">
                    {/* <li className="page-item"><button
                        value={-1}
                        onClick={(e)=>{
                            setPage(e.target.value)
                            doApiPic();
                        }}
                        className=" btn btn-outline-info m-1">Previous</button></li> */}
                    <li className="page-item"><button
                        value={1}
                        onClick={(e)=>{
                            setPage(e.target.value)
                            doApiPic();
                        }}
                        className=" btn btn-outline-info m-1">1</button></li>
                    <li className="page-item"><button
                        value={2}
                        onClick={(e)=>{
                            setPage(e.target.value)
                            doApiPic();
                        }}
                        className=" btn btn-outline-info m-1" >2</button></li>
                    <li className="page-item"><button
                        value={3}
                        onClick={(e)=>{
                            setPage(e.target.value)
                            doApiPic();
                        }}
                        className=" btn btn-outline-info m-1" >3</button></li>
              
                </ul>
            </nav>
            <div className="d-flex mb-3">
                <input
                    className="col-3 inputsearch form-control-md m-2 p-1 fs-5 text-capitalize "
                    type="text"
                    placeholder="Search Any Picture..."
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={submit}
                    className="btn btn-outline-dark m-2"
                >Submit</button>
                <button
                    className='btn btn-outline-danger m-2'
                    onClick={() => {
                        nav(-1)
                    }}
                >back</button>
            </div>
            {loading && <Loading />}
            {res.length > 0 ?
                <div className="col-12 d-flex justify-content-evenly flex-wrap imgbox">
                    {res.map((val, i) => {
                        return (
                            <div key={i}  className='col-md-3 d-flex p-2 '>
                            <img                         
                                height="100%"
                                className="col-12 img-fluid img p-2 "
                                src={val.urls.small}                          
                                alt="val.alt_description"
                                onClick={() => {
                                    setSearch(val.urls.small);
                                    toast.success("img url added");
                                    nav("/addPost")
                                    // alert(val.urls.small)
                                }}
                                style={{ cursor: "pointer" }}
                            />
                            </div>
                        );
                    })}
                </div> : <h2>NO IMAGES FOR THIS VALUE</h2>}


        </div>
    )
}

export default Searchpic