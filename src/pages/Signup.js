import React, {useContext, useEffect, useState} from 'react';
import {useHistory, Link, Route} from 'react-router-dom';

import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {doesUsernameExist} from '../services/firebase';

const Login = () => {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress ==='' ;

    const handleSignUp = async (e) => {
        e.preventDefault();
        const usernameExist = await doesUsernameExist(userName);
        if (!usernameExist) {
            try{
                /* Create an account in the athentication section of firebase */
                /* This is because we can use athentication for each user */
                const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password);
                
                /* Set display property of the user in the athentication section equal to username */

                await createdUserResult.user.updateProfile({
                    displayName: userName
                });

                /* Create the user in the collection using the information of the user in athentication section */

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following:[],
                    dateCreated: Date.now()
                });
                
                history.push(ROUTES.DASHBOARD);

            } catch (err) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(err.message);
            }
        } else {
            setError('This username is already taken!')
        }
    };

    useEffect (() => {
        document.title = 'Signup-Instagram';
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
                    <form onSubmit={handleSignUp} method='POST'>
                        <input
                            aria-label='Enter your Username'
                            type='text'
                            placeholder='Username'
                            className='text-sm text-gray-base w-full border rounded mb-2 mr-3 px-4 py-5 h-2 my-2'
                            value={userName}
                            onChange = {(e) => setUserName(e.target.value)}
                        />

                        <input
                            aria-label='Enter your full name'
                            type='text'
                            placeholder='Full Name'
                            className='text-sm text-gray-base w-full border rounded mb-2 mr-3 px-4 py-5 h-2 my-2'
                            value={fullName}
                            onChange = {(e) => setFullName(e.target.value)}
                        />

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
                            Sign up
                        </button>
                    </form>
                </div>
                
                <p className='border rounded border-gray-primary text-center my-3 py-3 bg-white'>
                    Already have an account? {` `}  
                    <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium' >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};


export default Login;