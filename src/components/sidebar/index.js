import React from 'react';

import useUser from '../../hooks/use-user';

import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {

    const {user} = useUser();
    const {fullName, userId, username, following} = user;

    return (
        <div className=' container col-span-1'>
            <User fullName = {fullName} userId = {userId} userName={username}/>
            <Suggestions userId = {userId} following = {following} />
        </div>
    );
};

export default Sidebar;