import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import { FaRegEnvelope} from "react-icons/fa";
import { MdLockOutline} from "react-icons/md";
import { signup } from "../api/users";
import { useState } from 'react';

// function verifySameMdp(){
//     var Mdp1 = document.getElementsByName("password").values();
//     var Mdp2 = document.getElementsByName("Check_Password").values();

//     if(Mdp1 != Mdp2){
//       document.getElementsByName("error").innerText() = "Mot de Passe non identiques";
//     }
//   }

export default function SignUp(){

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [VerifPwd, setVErifPwd] = useState("");

    const submitSignUp = async () =>{
        const Email = mail;
        const pwd = password;
        const Nom = nom;
        const Prenom = prenom;
        const Pseudo = pseudo;
        const pwdVErif = VerifPwd;
    
        if (Email == "" || pwd == "" || Nom == "" || Prenom == "" || pseudo == "" || pwdVErif == ""){
          console.log("un champ est manquant");
          alert("un champ est manquant");
          return;
          //document.getElementById('error').innerHTML = "un champ est manquant";
          //console.log(document.getElementById('error').innerHTML);
        }
        if (pwd.trim() != pwdVErif.trim()){
            alert("mdp different");
            console.log(pwd,pwdVErif);
            return;
        }
        const response = await signup(Nom, Prenom, Pseudo, Email, pwd)
        .then(()=>{
          alert("vérification envoyée. Veuillez verifiez vos mails.");
          window.location.href = "/Compte/SignIn";
        })
        .catch((err)=>(console.log(err)));
      }

    return (
        <Layout>
        <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-[#1DA1F2]">RE-Source</span> APP
            </div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-[#1DA1F2] mb-2">Créer un compte</h2>
                <div className="border-2 w-10 border-blue-700 inline-block mb-2"></div>
                <p className="text-gray-400 my-3">Veuillez remplir tout les champs </p>
                <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-4 p-2">
                    <div className="bg-gray-100 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="nom" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="prenom" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 col-span-2 w-64 flex items-center mb-2">
                        <FaRegEnvelope className="text-gray-400 m-2"/>
                        <input type="email" name="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="bg-gray-100 w-64 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 col-span-2 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>         
                    <div className="bg-gray-100 w-48 flex items-center mb-2">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de Passe" className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>      
                    <div className="bg-gray-100 w-48 flex items-center mb-2">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="Check_password" placeholder="Confirmez Mot de Passe" value={VerifPwd} onChange={(e) => setVErifPwd(e.target.value)} className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>     
                </div>
            </div>
            <div className="items-center">
                {/* <Link href="#" >
                    <a className="bg-[#1DA1F2] border-2 border-[#1DA1F2] text-white rounded-full px-12 py-2 inline-block font-semibold">Créer</a>
                </Link> */}
                <button type='submit' onClick={submitSignUp} className="bg-[#1DA1F2] border-2 border-[#1DA1F2] text-white rounded-full px-12 py-2 inline-block font-semibold">Créer</button>
            </div>

          </div>  
          <div className="w-2/5 bg-[#1DA1F2] text-white rounded-tr-2xl rounded-br-2xl py-36 px">
            <h2 className="text-3xl font-bold mb-2"> Bienvenue à toi !</h2> 
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">Inscrit toi gratuitement sur RE-Souce !</p>
            <p className="mb-2">Tu as deja un compte, clique en bas là</p>
            <Link href="/Compte/SignIn">
                <a className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:font-bold">Connexion</a>
            </Link>
          </div>
        </Layout>
    )
}