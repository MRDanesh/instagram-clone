import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const User = ({userName, fullName, }) => {

    const skeletonComponent = () => {
        return (
            <Skeleton count={1} height={61} />    
        );
    };

    const renderProfile = () => {
        return (
            <Link to={`/p/${userName}`} className='grid grid-cols-4 gap-4 mb-6 items-center'>
                <div className='flex items-center justify-between col-span-1' >
                    <img
                        className='rounded-full w-16 mr-3'
                        src={`/images/avatars/${userName}.png`}
                    />
                </div>
                <div className='col-span-3' >
                    <p className='text-sm font-bold'>{userName}</p>
                    <p className='text-sm'>{fullName}</p>
                </div>
            </Link>
        );
    };

    return (
        <>
            {!userName || !fullName ? skeletonComponent() : renderProfile()}
        </>
    )
    
};

export default User;