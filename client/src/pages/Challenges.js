import './Pages.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../data'

const API_Challenge = 'http://localhost:5000/challenge'



const Challenges = () => {
    const [imgData, setImgData] = useState([]);

    const user = data['users'][0];

    const fetchData = async (id) => {
        const result = await axios.get(API_Challenge + '/' + id);
        setImgData(result.data);
    }

    useEffect(() => {
        fetchData(user.id);
    }, [])

    return (
        <div className='row'>

            {imgData.map((item) => (
                <div className='col-6' >
                    <div className='row'>
                        <div className='col-4'>
                            <img src={item.image_url} style={{ width: 200, height: 200, marginTop: 0 }} />
                        </div>
                        <div className='col-8' style={{ padding: 20 }}>
                            <h4>Challenge Name: {item.name}</h4>
                            <h4>Challenge Tag: {item.tags}</h4>
                            <h4>Followers: {item.likes}</h4>
                            <h4>Ranking: {item.rank}</h4>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Challenges
