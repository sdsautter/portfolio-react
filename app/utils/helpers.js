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

export const gameSyncHelper = (cb) => {
    return(
        axios.get("/gamesync")
            .then(function (result) {
                 //setState here for React to get
                console.log("game sync")
                            // console.log(result.data);                            
                            // console.log(result.data.length);
                cb(result);
            })
            .catch(function (error) {
                console.log(error);
                            //Error Handling lol
                            // gameSync();
            })
    )
}

export const roundSyncHelper = (cb) => {
    axios.get("/roundsync")
                        .then(function (result) {
                 //setState here for React to get
                            console.log("round sync")
                            // console.log(result.data);                            
                            // console.log(result.data.length);
                            cb(result);
                        })
                        .catch(function (error) {
                            console.log(error);
                            //Error Handling lol
                            // roundSync();
                        });
}