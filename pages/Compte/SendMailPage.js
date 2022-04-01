import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { FaRegEnvelope} from "react-icons/fa";
import { MdLockOutline} from "react-icons/md";



export default function SendMailPage(){
    return (
        <Layout>
            <div className="w-3/5 p-5">
                <div className="text-left font-bold">
                <span className="text-blue-500">RE-Source</span> APP
                </div>
                <div className="py-10">
                <h2 className="text-3xl font-bold text-blue-700 mb-2">Connexion</h2>
                <div className="border-2 w-10 border-blue-700 inline-block mb-2"></div>
                <p className="text-gray-400 my-3">Utilisez vos identifiants pour vous connecter</p>
                    <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        <FaRegEnvelope className="text-gray-400 m-2" />
                        <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                        <MdLockOutline className="text-gray-400 m-2" />
                        <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1"/>
                    </div>
                    <div className="flex w-64 mb-5 p-2 flex items-center">
                        <Link href="#"><a className="text-xs text-blue-700">Mot de Passe Oublié</a></Link>  
                    </div>
                    <div className="items-center">
                        <Link href="#">
                            <a className="bg-blue-700 border-2 border-blue-700 text-white rounded-full px-12 py-2 inline-block font-semibold">Connexion</a>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>  
            <div className="w-2/5 bg-blue-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px">
            <h2 className="text-3xl font-bold mb-2"> Salut à toi!</h2> 
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">Si tu n'es pas inscrit sur RE-SOURCE, c'est le moment.</p>
            <Link href="/Compte/SignUp">
                <a className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold">Créer un compte</a>
            </Link>
            </div>
    </Layout>
    )

}