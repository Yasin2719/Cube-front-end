import Link from "next/link";
import Image from "next/image"
import Layout from "../components/Layout/Layout";
import styles from "./Acceuil/acceuil.module.css";
import Nav from "../components/NavBar/NavBar"


export default function Acceuil() {
    return (
        <Layout>
                   <Nav />
                {/* <nav className={styles["top-nav"]}>
                    <Link href="#">
                        <a className={styles["menu-item"] + " " + styles["active-anim"]}><p>Acceuil</p></a>
                    </Link>
                    <Link href="#">
                        <a className={styles["menu-item"] + " " + styles["active-anim"]}><Image src="/Ressources/images/home.svg" layout="fill"></Image></a>
                    </Link>
                    <Link href="#">
                        <a className={styles["menu-item"]}><p>Acceuil</p></a>
                    </Link>
                    <Link href="#">
                        <a className={styles["menu-item"]}><p>Mon Compte</p></a>
                    </Link>
                </nav> */}
                
                <div className="text-left font-bold">
                    <span className="text-blue-500">RE-Source</span>
                </div>
                <div className="py-10">
                    <h2></h2>
                    <div></div>
                    <p></p>
                    <div>
                        <div>

                        </div>
                    </div>

                </div>

        </Layout>
    )
}