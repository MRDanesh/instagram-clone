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
    const allUsers = result.docs.map((user) => ({...user.data(), docId: user.id}));
    // filter only not following and not myself

    const suggestedUsers = allUsers.filter((user) => {
        if (user.userId !== userId && !following.includes(user.userId)  ) {
            return user;
        }
    });
    return suggestedUsers;
};

// updateLoggedInUserFollowing, updateFollowedUserFollowers

export const updateLoggedInUserFollowing = async (
    loggedInUserDocId, profileId, isFollowingProfile
    ) => {
        console.log(loggedInUserDocId);
        const loggedInProfile = await firebase.firestore().collection('users').doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile 
            ? FieldValue.arrayRemove(profileId)
            : FieldValue.arrayUnion(profileId)
        });
};

export const updateFollowedUserFollowers = async (
    profileDocId, userId, isFollowingLoggedInUser
) => {
    const followingProfile = await firebase.firestore().collection('users').doc(profileDocId)
        .update({
            followers: isFollowingLoggedInUser 
            ? FieldValue.arrayRemove(userId)
            : FieldValue.arrayUnion(userId)
        });

};