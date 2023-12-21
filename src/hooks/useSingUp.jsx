import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    // will show if there error and what is the error
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addNewDoc = async (data) => {
        const ref = collection(db, 'users')
        await addDoc(ref, data)
    }

    const signup = async (email, password, firstName, lastName) => {
        try {
            setError(null);
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            addNewDoc({ firstName: firstName, lastName: lastName, email: email,cvs:[],role:"user"});
            console.log("user sign in:", res.user);
            navigate('/login');

        }
        catch (err) {
            setError(err.message);
            if(err.message=="Firebase: Error (auth/email-already-in-use)."){
                setError("email already in use, try login.");
            }
        }
    }

    return { error, signup }
}
