import React, { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useCollection } from '../hooks/useCollection'
import { useDispatch, useSelector } from 'react-redux';
import {
    setUserId,
    setFirstNameUser,
    setLastNameUser,
    setEmailUser,
    setAllCvs,
    setRole,
} from "../features/userSlice";

export default function Login() {
    const { error, login } = useLogin();
    const mailRef = useRef();
    const passRef = useRef();
    const dispatch = useDispatch();
    const { docs: users } = useCollection("users")

    const updateUserSlice = (email) => {
        users.map(item => {
            if (item.email == email) {
                dispatch(setUserId(item.id));
                dispatch(setFirstNameUser(item.firstName));
                dispatch(setLastNameUser(item.lastName));
                dispatch(setEmailUser(item.email));
                dispatch(setAllCvs(item.cvs));
                dispatch(setRole(item.role));
                return;
            }
        })
    }

    const onSub = (e) => {
        e.preventDefault();
        login(mailRef.current.value, passRef.current.value);
        updateUserSlice(mailRef.current.value);
    };

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <form onSubmit={onSub} className='mt-5' style={{width:'35%'}}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                            Email:
                        </label>
                        <input ref={mailRef} type='email' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            Password:
                        </label>
                        <input ref={passRef} type='password' className='form-control' />
                    </div>
                    <p className="mt-3">
                        Don't have an account? <a href="/signup" style={{ textDecoration: 'underline'}}>signup</a>
                    </p>
                    <h3 className='text-danger'>{error}</h3>
                    <button type='submit' className='btn btn-primary'>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}