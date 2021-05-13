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