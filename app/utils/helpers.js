// Here we will utilize the axios library to perform GET/POST requests
import axios from "axios";

// Exporting an object with methods for retrieving and posting data to our API
export const addAnswer = (gameInstanceId, answer) => {
    console.log(gameInstance);
    return axios.post(`/api/games/${gameInstanceId}`, { answer })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
}

export const gameSyncHelper = (gameInstanceId, cb) => {
    return(
        axios.get(`/api/games/${gameInstanceId}`)
            .then(function (result) {
                cb(result);
            })
            .catch(function (error) {
                console.log(error);
            })
    )
}