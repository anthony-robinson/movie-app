export interface IMovie extends Object {
    title: string,
    released?: string, //Released
    plot?: string, //Plot
    rating?: string, //imdbRating
    genre?: string,
    image: string, //Poster
    year: string
}