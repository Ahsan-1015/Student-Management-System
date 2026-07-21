import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://student-management-system-j6qh.vercel.app/api';

export default axios.create({ baseURL });
