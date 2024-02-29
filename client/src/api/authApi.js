import axios from 'axios';

const apiAuthInstance = axios.create({
    baseURL : 'https://rushchat.onrender.com',
    headers:{
        Authorization : localStorage.getItem('accessToken'),
        "Content-Type": "application/json",
    },
})

export default apiAuthInstance;