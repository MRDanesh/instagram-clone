import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const SuggestedProfiles = ({userDocId, key, username, profileId, userId}) => {
    const [followed, setFollowed] = useState(false);

    return !followed ? (
        <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center justify-between'>
                <img 
                className='rounded-full w-8 mr-3'
                src={`/images/avatars/${username}.jpg`}
                />
                <Link to={`/p/${username}`}>
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
            <button
                className='font-bold text-sm text-blue-medium'
                type='button'
                onClick={() => console.log('Followed!')}
            >
                Follow
            </button>
        </div>
    ) : null
};

export default SuggestedProfiles;