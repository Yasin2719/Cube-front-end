import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ProfilPanel from "../../components/ProfilPanel";

export default function Profil(){
    return (
        <div>
        <Head>
            <title>RE-Source</title>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <main className="bg-white flex min-h-screen max-w-[1500px] mx-auto">
            <Sidebar />
            <ProfilPanel />
            {/*Widget*/}

            {/*Modal*/}
        </main>
        </div>
    )
}