import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            setError(null);
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log("user logged in:", res.user);
            navigate("/home");
        }
        catch (err) {
            setError(err.message);
            if (err.message == "Firebase: Error (auth/invalid-credential).") {
                setError("email or password missing, try sing up or fix your passowrd.");
            }
            if (err.message == "Firebase: Error (auth/invalid-email).") {
                setError("missing email");
            }
            if (err.message == "Firebase: Error (auth/missing-password).") {
                setError("missing password");
            }
        }

    }

    return { error, login }
}