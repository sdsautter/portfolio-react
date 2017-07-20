// Here we will utilize the axios library to perform GET/POST requests
import axios from "axios";

// Exporting an object with methods for retrieving and posting data to our API
export const addAnswer = (gameInstance) => {
    console.log(gameInstance);
    return axios.post(`/api/games/${gameInstance}`)
}