import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../store/store';
import { FullscreenImage } from '../store/store';

export default function Home() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);
    const loading = useSelector(state => state.photos.loading);
    const error = useSelector(state => state.photos.error);
    const count = useSelector(state => state.count.count);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    if (loading) {
        return <p className="loading">Loading Photos...</p>;
    }
    if (error) {
        return <p className="error">Error fetching photos... {error}</p>;
    }
    return (
        <div className="home">
            <h1>Home Page</h1>
            <h1>Count = {count}</h1>
            <div className="posts-container">
                <div className="posts-grid">
                    {photos.map(photo => (
                        <div className="post-image" key={photo.id}>
                            <FullscreenImage
                                src={photo.src.original} // Assuming you're using the original size from the API
                                description={photo.alt} // Description from the API
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
