import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    DotsHorizontalIcon
} from "@heroicons/react/solid";

export default function Sidebar(){
    return(
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:x-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-10 h-10 hoverAnimation p-0 xl:ml-24 text-black">
                <Image src="https://rb.gy/jmkagt" width={30} height={30}/>
            </div>
            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                <SidebarLink text="Home" Icon={HomeIcon} active link="/"/>
                {/* <SidebarLink text="Explore" Icon={HashtagIcon}/>
                <SidebarLink text="Notifications" Icon={BellIcon}/>
                <SidebarLink text="Messages" Icon={InboxIcon}/>
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon}/>
                <SidebarLink text="Lists" Icon={ClipboardListIcon}/> */}
                <SidebarLink text="Profil" Icon={UserIcon} link="/Compte/Profil"/>
                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
            </div>
            <button className="hidden xl:inline ml-auto bg-600 text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white">
                Post
            </button>
            <div className="text-black flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
                <img src="https://lh3.googleusercontent.com/-S39qlmxYztQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYC58uiGPG_o3RUu5jK_ZzIUTW2w/photo.jpg?sz=46" alt="" className="h-10 w-10 rounded-full xl:mr-2.5"/>
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">Karakus Yasin</h4>
                    <p className="text-black">@yasin.karakus</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
            </div>
        </div>
    )
}