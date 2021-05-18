import {useState, useEffect, useContext} from 'react';

import UserContext from '../context/user';
import {getUserByUserId} from '../services/firebase';


const useUser = () => {
    const [activeUser, setActiveUser] = useState({});
    const {user} = useContext(UserContext);
    
    useEffect(() => {
        const getUserObjById = async () => {
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if(user){
            getUserObjById();
        }
    }, [user])

    return {user: activeUser};
};

export default useUser;