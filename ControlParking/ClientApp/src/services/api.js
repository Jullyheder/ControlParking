﻿import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44310/api'
});

export default api;