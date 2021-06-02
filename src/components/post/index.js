import React, {useRef} from 'react';

import Header from './Header';
import Image from './Image';

const Post = ({content}) => {
    return (
        <div className='rounded bg-white border border-gray-primary mb-16'>
            <Header username={content.username}/>
            <Image src={content.imageSrc} caption={content.caption} />
        </div> 
    );
};

export default Post;
