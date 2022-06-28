import Head from "next/head";
import Sidebar from "../../../components/Sidebar";
import ProfilPanel from "../../../components/ProfilPanel";
import { getAllUserId, getUserInfos } from "../../api/users";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { getUser } from '../../api/users';

export default function Profil({userData}){
    const [ userId, setUserId ] = useState("")
    const dispatch = useDispatch();

    useEffect(() =>{
        setUserId(userData._id)
        console.log(userId);
        if(typeof Cookies.get("userId") !== "undefined") dispatch(getUser(userData._id))
        
    }, [userId])

    const getInfos = async() =>{
        const res = await getUserInfos(Cookies.get("userId"))
        .then((response) =>{
            setuserData(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }



    return (
        <div>
        <Head>
            <title>RE-Source</title>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <main className="bg-white flex min-h-screen max-w-[1500px] mx-auto">
            <Sidebar activeLink={true}/>
            <ProfilPanel userData={userData}/>
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
    const id = params.user;
    const response = await getUserInfos(id)
    return {props: {userData: response.data}}
  }