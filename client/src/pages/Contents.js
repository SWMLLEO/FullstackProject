import './Pages.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const API_Contents = 'http://localhost:5000/contents'

const Contents = () => {

    const [viewData, setViewData] = useState([]);


    const [currentUser, setCurrentUser] = useState();


    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user')))
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios.get(API_Contents);
        setViewData(result.data);
    };

    const handleOnclick = async (item) => {
        const updatedData = {
            likes: item.likes + 1
        }
        await axios.patch(API_Contents + '/' + item.user_id, updatedData);
        fetchData();
    }

    return (
        <div>
            <ImageList sx={{ width: 1500, height: 900 }} className='image-list'>
                <ImageListItem key="Subheader" cols={4}>
                    <ListSubheader component="div">All Images</ListSubheader>
                </ImageListItem>
                {viewData.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={item.image_url}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.tags}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                    onClick={(e) => handleOnclick(item)}
                                >
                                    <StarBorderIcon />
                                </IconButton >
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>

    );
}

export default Contents
