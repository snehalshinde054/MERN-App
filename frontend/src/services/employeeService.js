import axios from "../api/axiosConfig";

export const getAllEmployees = async () =>{
    const response = await axios.get('/employee');
    return response.data.data;
};
