import React, { useState } from 'react';
import axios from 'axios';

const SearchPhotos = () => {
    const [keyword, setKeyword] = useState('');
    const [photos, setPhotos] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/photos/search?keyword=${keyword}`, { withCredentials: true });
            setPhotos(response.data);
        } catch (error) {
            console.error('Error searching photos', error);
        }
    };

    return (
        <div>
            <h1>Search Photos</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                />
                <button type="submit">Search</button>
            </form>
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

export default SearchPhotos;
