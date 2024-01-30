import axios from 'axios';

const apiAuthInstance = axios.create({
    // baseURL : 'https://as-b75n.onrender.com',
    baseURL : 'http://localhost:8000',
    headers:{
        Authorization : localStorage.getItem('accessToken'),
        "Content-Type": "application/json",
    },
})

export default apiAuthInstance;