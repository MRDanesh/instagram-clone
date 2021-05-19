import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/firebase';

const SuggestedProfiles = ({profileDocId, key, username, profileId, userId, loggedInUserDocId}) => {
    const [followed, setFollowed] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId);
    }

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
                onClick={() => handleFollowUser()}
            >
                Follow
            </button>
        </div>
    ) : null
};

export default SuggestedProfiles;