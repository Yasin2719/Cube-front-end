export default function ProfilePanelLink({Icon, text, link }){
    return( 
        <div className={`text-[#1DA1F2] flex items-center justify-center xl:justify-start text-xl space-x-3 p-10 hoverAnimation`}>
            <Icon className="h-8 w-30" />
            <a href={link} className="hidden xl:inline text-black">{text}</a>
            {/* <span className="hidden xl:inline">{text}</span> */}
        </div>
    )
}