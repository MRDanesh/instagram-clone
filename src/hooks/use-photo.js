import {useState, useContext, useEffect} from 'react';
import UserContext from '../context/user';

import {getUserByUserId, getPhotos} from '../services/firebase'

const usePhotos = async () => {
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
    return {photos};
};

export default usePhotos;

