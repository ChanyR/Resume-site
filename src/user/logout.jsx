import React, { useEffect } from 'react'
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setUserId,
    setFirstNameUser,
    setLastNameUser,
    setEmailUser,
    setAllCvs,
    setRole,
} from "../features/userSlice";
import {
    setResumeId,
} from "../features/cvSlice";

const Logout = () => {

    const { logout } = useLogout();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const delay = 1000;

        const timeoutId = setTimeout(() => {
            logout();
            dispatch(setUserId(''));
            dispatch(setFirstNameUser(''));
            dispatch(setLastNameUser(''));
            dispatch(setEmailUser(''));
            dispatch(setAllCvs([]));
            dispatch(setRole(''));
            dispatch(setResumeId(''));
            navigate('/login');
        }, delay);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="container">
            <img src='../public/loading.gif' width={200} className='mt-5' />
            <h4 className='text-dark'>Logout</h4>
        </div>

    )
}

export default Logout