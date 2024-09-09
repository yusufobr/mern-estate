import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            const result = await signInWithPopup(auth, provider);
            
            const res = await axios.post("/api/auth/google", {
                name: result.user?.displayName,
                email: result.user?.email,
                photo: result.user?.photoURL,
                googleId: result.user?.uid
            });

            const data = await res.data;
            dispatch(signInSuccess(data));

            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button className="border p-3 bg-slate-50 rounded-md focus:outline-none w-full" type="button" onClick={handleClick}>
        Continue with Google {" "}
        <FcGoogle size={24} className="inline-block ml-2" />
    </button>
  )
}

export default OAuth