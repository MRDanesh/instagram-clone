import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import UserContext from '../context/user';
import {getUserByUserId, getPhotos} from '../services/firebase';
import usePhotos from '../hooks/use-photo';
import Post from './post';

const Timeline = () => {
    const [photos, setPhotos] = useState(null);
    const {user} = useContext(UserContext);
    const userId = user.uid;
    useEffect( () => {
        const getTimeLinePhotos = async () => {
            const [{following}] = await getUserByUserId(userId);
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
                setPhotos(followedUserPhotos);
            }
        };
        getTimeLinePhotos();
    },[userId]);

    /*
        Why const {photos} = usePhotos(); does not work?!
    */
    
    
    
    return (
        <div className='container col-span-2'>
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className='mb-5'/>
            ) : photos.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : (
                <p className='text-center text-2xl' >Follow people to see photos!</p>
            )}
        </div>
    );
};

export default Timeline;