import React, {useContext, useEffect, useState} from 'react';
import {useHistory, Link, Route} from 'react-router-dom';

import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress ==='' ;

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (err) {
            setEmailAddress('');
            setPassword('');
            setError(err.message)
        }

    };

    useEffect (() => {
        document.title = 'Login-Instagram';
    },[]);


    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen '>
            <div className='flex w-3/5'>
                <img src='/images/iphone-with-profile.jpg' alt='iphone with instagram'/>
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col justify-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <h1 className='flex justify-center w-full'>
                        <img src='/images/logo.png'/>
                    </h1>
                    {error && <p className='mb-4 text-red-primary text-xs' >{error}</p>}
                    <form onSubmit={handleLogin} method='POST'>
                        <input
                            aria-label='Enter your email address'
                            type='text'
                            placeholder='Email address'
                            className='text-sm text-gray-base w-full border rounded mb-2 mr-3 px-4 py-5 h-2 my-2'
                            value={emailAddress}
                            onChange = {(e) => setEmailAddress(e.target.value)}
                        />

                        <input
                            aria-label='Enter your password'
                            type='password'
                            placeholder='Password'
                            className='text-sm text-gray-base w-full border rounded mb-2 mr-3 px-4 py-5 h-2 my-2'
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type='submit'
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Log in
                        </button>
                    </form>
                </div>
                
                <p className='border rounded border-gray-primary text-center my-3 py-3 bg-white'>
                    Dont have account? {` `}  
                    <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium' >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Config css

// text-blue-medium

export default Login;