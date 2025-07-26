import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:4000/api',
    headers : {
        'Content-type' : 'application/josn',
    },
});

export default instance;