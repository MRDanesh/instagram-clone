import React from 'react';
import Skeleton from 'react-loading-skeleton';

import usePhotos from '../hooks/use-photo';

const Timeline = () => {
    const {photos} = usePhotos();

    return (
        <div className=' container col-span-2'>
            Timeline
        </div>
    );
};

export default Timeline;