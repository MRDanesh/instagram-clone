import {firebase, FieldValue} from '../lib/firebase';

export const doesUsernameExist = async (username) => {
    const result = await firebase.
    firestore().collection('users').where('username', '==', username).get();
    const user = result.docs.map((u) => u.data());
    if (!user.length) {
        //console.log('false');
        return false;
    } else {
        //console.log('true');
        return true;
    }
};

export const getUserByUserId = async (userId) => {
    const result = await firebase.
    firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export const getSuggestedProfiles = async (userId, following) => {
    const result = await firebase.
    firestore().collection('users').limit(10).get();
    const allUsers = result.docs.map((user) => user.data());
    // filter only not following and not myself

    const suggestedUsers = allUsers.filter((user) => {
        if (user.userId !== userId && !following.includes(user.userId)  ) {
            return user;
        }
    });
    return suggestedUsers;
};