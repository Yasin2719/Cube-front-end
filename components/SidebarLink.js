import Link from "next/link";

export default function SidebarLink({Icon, text, active, link }){

    return( 
        <div className={`text-[#1DA1F2] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
            <Icon className="h-7" />
            <a href={link} className="hidden xl:inline text-black">{text}</a>
        </div>
    )
}