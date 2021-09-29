import axios from 'axios';


export const url = 'http://www.omdbapi.com/?apikey='; 
export const apikey = `${process.env.REACT_APP_APIKEY}`

export const getMovies = async(value : string) => {
    try {
        return await axios.get(`${url}${apikey}`, {
            headers: {"Content-Type": "application/json"},
            params: {
                "s": value,
                "page": 1,
                "type": "movie"
            }
        })
    } catch(err) {
        console.error(err);
    }
}

// get an individual movie by title 
export const getSingleMovie = async(title : string) => {
    try {
        return await axios.get(`${url}${apikey}`, {
            headers: {"Content-Type": "application/json"},
            params: {
                "t": title
            }
        })
    } catch(err) {
        console.error(err);
    }
}
