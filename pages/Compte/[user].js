import Sidebar from "../../components/Sidebar"
import Head from "next/head";


// export async function getStaticProps({ params }) {
//     const postData = await getPostData(params.id)
//     return {
//       props: {
//         postData
//       }
//     }
//   }

export default function home(){
    return (
        <div>
        <Head>
            <title>RE-Source</title>
            <link rel="icon" href="/favicon.ico"></link>
        </Head>
        <main className="bg-white flex min-h-screen max-w-[1500px] mx-auto">
            <Sidebar activeLink={true}/>
            
            {/*Widget*/}

            {/*Modal*/}
        </main>
        </div>
    )
}