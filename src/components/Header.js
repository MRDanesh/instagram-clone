import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

const Header = () => {
    const {firebase} = useContext(FirebaseContext);
    const {user} = useContext(UserContext);

    const userSignedIn = () => {
        return (
            <>
                <Link to={ROUTES.DASHBOARD}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
                <button
                    type='button'
                    title='Sign out'
                    onClick={() => firebase.auth().signOut()}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            firebase.auth().signOut();
                        }            
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                </button>
                <div className='flex items-center'>
                     <Link to={`/p/${user.displayName}`}>
                        <img
                            className='rounded-full h-8 w-8'
                            src={`/images/avatars/${user.displayName}.png`} 
                        />
                     </Link>
                </div>
            </>
        );
    };

    const userSignedOut = () => {
        return (
            <>
                <Link to={ROUTES.LOGIN}>
                    <button
                        type='button'
                        className='bg-blue-medium border rounded text-white w-20 h-8 font-bold mr-3 text-sm'
                    >
                        Log IN
                    </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                    <p className='text-sm text-blue-medium font-bold'>Sign Up</p>
                </Link>
                
            </>
        );
    };
    
    return (
        <header className='h-16 bg-white border-b border mb-8 border-gray-primary'>
            <div className='container mx-auto h-full'>
                <div className='flex justify-between items-center h-full mx-3.5'>
                    <div className='flex text-gray-700 text-center items-center'>
                        <Link to={ROUTES.DASHBOARD}>
                            <img src='./images/logo.png' className='mb-2 w-6/12' />
                        </Link>
                    </div>
                    <div className='flex items-center  text-gray-700 '>
                        {user ? userSignedIn() : userSignedOut()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;