import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiService';
import ItemPost from './itemPost';
import { reverse } from 'lodash'
import Authclient from '../global_comps/authclient';

function ListPost(props) {
    let [ar, setAr] = useState([]);
    let [loading, setLoading] = useState(false);
    
    
    // creat allPosts_ar because we dont want touch the original ar
    let allPosts_ar = [];
    // for lazy loading use end screen to know when the pade is over
    let endScreen = false;
    let limitShow = 2;
    const onScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 4 && !endScreen) {
            endScreen = true;
            limitShow += 3;
            doApi()
        }
    }
    const filterPosts = () => {
        let temp_ar = [...allPosts_ar]
        
        setAr(temp_ar.splice(0, limitShow));
        endScreen = false;
        // console.log(temp_ar);
    }
    useEffect(()=>{
        doApi()
    },[])

    useEffect(() => {    
        // for Lazy loading
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    const doApi = async () => {
        let url = API_URL + "/posts/all"
        try {
            setLoading(true);
            let { data } = await doApiGet(url);      
            reverse(data);
            allPosts_ar = [...data]
            filterPosts();
            setLoading(false);
        } catch (error) {
            alert("error,come back later 5555")
            console.log(error);
        }
    }
    
    return (
        <div className=''>
            <Authclient />
            {loading && <h1>Loading....</h1>}
         
            {ar.map((item) => {
                return (
                    <ItemPost key={item._id} item={item} ar={ar} />
                )
            }

            )}
            {endScreen && <h1>Loading....</h1>}
        </div>
    )
}

export default ListPost