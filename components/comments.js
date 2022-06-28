export default function comment({comment}) {
    return (<div className="p-3 flex cursor-pointer border-b border-gray w-10/12">
        <div className="flex flex-col space-y-2 w-full">
            <div className="flex">
                <div className="text-gray">
                    <div className="inline-block group">
                        <h4 className={`font-bold text-[15px] sm:text-base text-black group-hover:underline`}>{comment.commenterPseudo}</h4>
                        <span></span>
                    </div>{" "}
                        {" "}
                    <span className="hover: underline text-sm sm:text-[15px]">
                        {" "}
                    </span>
                    <p>{" "}</p>
                    <p>{" "}</p>
                    <p className="font-medium text-gray text-[15px] sm:text-base mt-0.5">{comment.text}</p>
                </div>
            </div>
        </div>
    </div>)
}