import axios from 'axios';

export const url = 'http://www.omdbapi.com/?apikey='; //'[yourkey]&'


export const getMovies = async(value : string) => {
     return await axios.get(`${url}${apikey}`, {
          headers: {"Content-Type": "application/json"},
          params: {
            "s": value,
            "page": 1
        }
    })
}
