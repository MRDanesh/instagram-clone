import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';

import {getSuggestedProfiles} from '../../services/firebase';

import SuggestedProfiles from './SuggestedProfiles';

const Suggestions = ({userId, following, loggedInUserDocId}) => {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        const suggestedProfiles = async () => {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        };
        if(userId){
            suggestedProfiles();
        }
    }, [userId]);

    const skeletonComponent = () => {
        return (
            <Skeleton count={1} height={150} />    
        );
    };

    const suggestedComponent = () => {
        return (
            <div className='rounded flex flex-col'>
                <div className='text-sm flex items-center justify-between mb-2'>
                    <p className='font-bold text-gray-base'>Suggestions for you</p>
                </div>
                <div className='mt-4 grid gap-5'>
                    {profiles.map((profile) => (
                        <div key={profile.docId}>
                            <SuggestedProfiles
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId = {loggedInUserDocId}
                        />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {!profiles ? skeletonComponent() : suggestedComponent()}
        </>
    );
};

export default Suggestions;