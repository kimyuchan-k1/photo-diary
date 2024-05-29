import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('/photos', { withCredentials: true });
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>Photo List</h1>
            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.image_url} alt={photo.description} />
                        <p>{photo.description}</p>
                        <p>{photo.keywords}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoList;
