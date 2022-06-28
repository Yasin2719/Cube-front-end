import Link from "next/link";
import Image from "next/image"
import Layout from "../../components/Layout/Layout"
import { FaRegEnvelope} from "react-icons/fa";
import { MdLockOutline} from "react-icons/md";
import { useState, useEffect } from 'react';
import { signin } from "../api/users";
import { useField } from 'formik';
import { TextInput } from '../../components/Login/TextInput';
import {Formik, Form} from 'formik';
import Cookies from "js-cookie";

export default function Home() {

  const [password, setPassword] = useState([])
  const [mail, setMail] = useState([])
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const body = 
  //   `{
  //     "userMail": "ilyesnzl27@gmail.com",
  //     "userPassword": "azerty"
  //   }`
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization' : 'Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c>' 
  //     },
  //     body: JSON.stringify({body}),
  //     mode: 'cors'
  //   }
  //   setLoading(true)
  //   fetch('http://localhost:3005/user/signin', options)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setData(data)
  //     setLoading(false)
  //   })
  // }, [])

  const submitUser = async () =>{
    const Email = mail;
    const pwd = password;
    console.log(mail, pwd);
    if (mail == "" || pwd == ""){
      // console.log("un champ est manquant");
      alert("un champ est manquant");
      document.getElementById('error').innerHTML = "un champ est manquant";
      // console.log(document.getElementById('error').innerHTML);
    }
    else{
      document.getElementById('error').innerHTML = "";
    }
    const response = await signin(mail, pwd)
    .then((result)=>{
      console.log(result);
      if(alert("Ok")){
        console.log("yes");
      }
      let idUser = result.data.data;
      // console.log(idUser);
      // localStorage.setItem('OnlineUserId', idUser);
      Cookies.set("userId", idUser);
      // Cookies.set("userName", )
      // console.log(Cookies.get("userId"));
      window.location.href = "/";
    })
    .catch((err)=>(console.log(err)));
  }

  return (
    <Layout>
      <div className="w-3/5 p-5">
        {/* <div className="w-20 h-20 rounded-3xl bg-[url('/public/logoRE.svg')] bg-center">

        </div>
        <Image href="/public/logoRE.jpg" /> */}
          <div className="text-left font-bold">
            <span className="text-[#1DA1F2]">RE-Source</span> APP
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-[#1DA1F2] mb-2">Connexion</h2>
            <div className="border-2 w-10 border-[#1DA1F2] inline-block mb-2"></div>
            <p className="text-gray-400 my-3">Utilisez vos identifiants pour vous connecter</p>
              <div className="flex flex-col items-center">
                {/* <Formik>
                  {() => (
                    <Form initialValues={{
                      email:"",
                      password: "",
                    }}
                    //validationSchema={}
                    onSubmit={(values, {setSubmitting}) =>(
                      console.log(values)
                    )}
                    > */}
                      <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        <FaRegEnvelope className="text-gray-400 m-2" />
                        <input type="email" name="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="bg-gray-100 outline-none text-sm flex-1"/>
                      </div>
                      <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 outline-none text-sm flex-1"/>
                      </div>
                      <div className="flex w-64 mb-5 p-2 flex items-center">
                        <Link href="#"><a className="text-xs text-[#1DA1F2]">Mot de Passe Oublié</a></Link>  
                      </div>
                      <label id="error" name="error" className="text-red-400 my-3"></label>
                      <div className="items-center">
                        {/* <Link href="/Acceuil">
                          <a className="bg-[#1DA1F2] border-2 border-[#1DA1F2] text-white rounded-full px-12 py-2 inline-block font-semibold">Connexion</a>
                        </Link> */}
                        <button type='submit' onClick={submitUser} className="bg-[#1DA1F2] border-2 border-[#1DA1F2] text-white rounded-full px-12 py-2 inline-block font-semibold">Connexion</button>
                      </div>
                    {/* </Form>
                  )}
                </Formik> */}
              </div>
          </div>
        </div>  
        <div className="w-2/5 bg-[#1DA1F2] text-white rounded-tr-2xl rounded-br-2xl py-36 px">
        <h2 className="text-3xl font-bold mb-2"> Salut à toi!</h2> 
        <div className="border-2 w-10 border-white inline-block mb-2"></div>
        <p className="mb-2">Si tu n'es pas inscrit sur RE-SOURCE, c'est le moment.</p>
        <Link href="/Compte/SignUp">
          <a className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:font-bold">Créer un compte</a>
        </Link>
      </div>
    </Layout>
  )
}