import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import { FaRegEnvelope} from "react-icons/fa";
import { MdLockOutline} from "react-icons/md";

// function verifySameMdp(){
//     var Mdp1 = document.getElementsByName("password").values();
//     var Mdp2 = document.getElementsByName("Check_Password").values();

//     if(Mdp1 != Mdp2){
//       document.getElementsByName("error").innerText() = "Mot de Passe non identiques";
//     }
//   }

export default function SignUp(){
    return (
        <Layout>
        <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-blue-500">RE-Source</span> APP
            </div>
            <div className="py-10">
                <h2 className="text-3xl font-bold text-blue-700 mb-2">Créer un compte</h2>
                <div className="border-2 w-10 border-blue-700 inline-block mb-2"></div>
                <p className="text-gray-400 my-3">Veuillez remplir tout les champs </p>
                <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-4 p-2">
                    <div className="bg-gray-100 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="nom" placeholder="Nom" className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="prenom" placeholder="Prénom" className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 col-span-2 w-64 flex items-center mb-2">
                        <FaRegEnvelope className="text-gray-400 m-2"/>
                        <input type="email" name="email" placeholder="Email" className="bg-gray-100 w-64 outline-none text-sm flex-1"/>
                    </div>

                    <div className="bg-gray-100 col-span-2 w-48 p-2 flex items-center mb-2">
                        <input type="text" name="pseudo" placeholder="Pseudo" className="bg-gray-100 w-44 outline-none text-sm flex-1"/>
                    </div>         
                    <div className="bg-gray-100 w-48 flex items-center mb-2">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="password" placeholder="Mot de Passe" className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>      
                    <div className="bg-gray-100 w-48 flex items-center mb-2">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="Check_password" placeholder="Confirmez Mot de Passe" className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>     
                </div>
            </div>
            <div className="items-center">
                <Link href="#" >
                    <a className="bg-blue-700 border-2 border-blue-700 text-white rounded-full px-12 py-2 inline-block font-semibold">Créer</a>
                </Link>
            </div>

          </div>  
          <div className="w-2/5 bg-blue-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px">
            <h2 className="text-3xl font-bold mb-2"> Bienvenue à toi !</h2> 
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">Inscrit toi gratuitement sur RE-Souce !</p>
            <p className="mb-2">Tu as deja un compte, clique en bas là</p>
            <Link href="/">
                <a className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold">Connexion</a>
            </Link>
          </div>
        </Layout>
    )
}