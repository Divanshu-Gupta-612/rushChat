import axios from 'axios';

const apiAuthInstance = axios.create({
    baseURL : 'https://rush-chat-server.onrender.com/',
    headers:{
        Authorization : localStorage.getItem('accessToken'),
        "Content-Type": "application/json",
    },
})

export default apiAuthInstance;