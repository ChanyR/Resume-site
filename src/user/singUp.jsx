import React, { useRef } from 'react';
import { useSignup } from '../hooks/useSingUp';
import { useForm } from 'react-hook-form';

export default function Signup() {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const firstNameRef = register("firstName", { required: true, minLength: 2 });
    const lastNameRef = register("lastName", { required: true, minLength: 2 });
    const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
    const passRef = register("pass", { required: true, minLength: 6 });
    const passVerifyRef = register("passVerify", { required: true, validate: (val) => { return val == getValues("pass") } });

    const { error, signup } = useSignup();


    const onSub = () => {
        signup(getValues("email"), getValues("pass"), getValues("firstName"), getValues("lastName"));
    };

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit(onSub)} className='mt-5 w-50'>
                    <div className='mb-3'>
                        <label htmlFor='text' className='form-label'>
                            First name:
                        </label>
                        <input {...firstNameRef} type="text" className='form-control' />
                        {errors.firstName && <div className='text-danger'>* Enter valid name: min 2 chars</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='text' className='form-label'>
                            Last name:
                        </label>
                        <input {...lastNameRef} type="text" className='form-control' />
                        {errors.lastName && <div className='text-danger'>* Enter valid name: min 2 chars</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                            Email:
                        </label>
                        <input {...emailRef} type='email' className='form-control' />
                        {errors.email && <div className='text-danger'>* Email is not valid</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            Password:
                        </label>
                        <input {...passRef} type='password' className='form-control' />
                        {errors.pass && <div className='text-danger'>* Enter valid password: min 6 chars</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                            Verify password:
                        </label>
                        <input {...passVerifyRef} type='password' className='form-control' />
                        {errors.passVerify && <div className='text-danger'>* Password not match</div>}
                    </div>
                    <p className="mt-3">
                        Have an account? try <a href="/login" style={{ textDecoration: 'underline'}}>login</a>
                    </p>
                    <h3 className='text-danger'>{error}</h3>
                    <button type='submit' className='btn btn-primary'>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}