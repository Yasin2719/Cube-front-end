import Sidebar from "../../../components/Sidebar"
import Head from "next/head";
import Feed from "../../../components/Profil/ressources/Feed";
import { getRessourcesByUserId } from "../../api/ressource";
import { getAllUserId, getUserInfos } from "../../api/users";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { getUser } from '../../api/users';


export default function home({ressources, userData}){

    const [ userId, setUserId ] = useState("")
    const dispatch = useDispatch();
    // const [ userId, setUserId ] = useState("")
    // const dispatch = useDispatch();
    
    useEffect(() =>{
        setUserId(userData._id)
        console.log(userId);
        if(typeof Cookies.get("userId") !== "undefined") dispatch(getUser(userData._id))
        // console.log(userData);
        // console.log(ressources);
        // console.log(userData._id);
    }, [userId])

    // useEffect(() =>{
    //     setUserId(userData._id)
    //     console.log(userId);
    //     if(typeof Cookies.get("userId") !== "undefined") dispatch(getUser(userData._id))
        
    // }, [userId])

    return (
        <div>
        <Head>
            <title>RE-Source</title>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <main className="bg-white flex min-h-screen max-w-[1500px] mx-auto">
            <Sidebar activeLink={true}/>
            <Feed ressources={ressources}/>
            {/*Widget*/}

            {/*Modal*/}
        </main>
        </div>
    )
}

export const getStaticPaths = async() => {
    const users = await getAllUserId();
    const paths = users.map((user) => ({
        params: {user: user._id}
    }));
    console.log(paths)
    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){

    console.log("statics props")
    const response = await getRessourcesByUserId(params.user);
    const user = await getUserInfos(params.user)
    // const responseJson = await response.json();
    console.log(response);
    console.log(user);
    return {props: {ressources: response, userData: user.data}}
  } 