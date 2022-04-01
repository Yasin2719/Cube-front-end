import {useField} from 'formik';
import { MdLockOutline} from "react-icons/md";

export const TextInput = ({...props}) => {
    const [field, meta] = useField(props);

    return(
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
            <MdLockOutline className="text-gray-400 m-2" />
            <input className="bg-gray-100 outline-none text-sm flex-1"/>
        </div>
    )
}

/*type={...props} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}*/