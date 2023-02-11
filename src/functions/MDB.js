import axios from "axios";
let moviesData = []
let seriesData = []
let moviesPage = 1;
const getMovies = (page) => {
    return axios.
        get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&page=${page}`)
}
const getSeries = (page) => {
    return axios
        .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&page=${page}`)
}

export const getTrendings = (setMovies) => {

    Promise.all([
        getMovies(1),
        getSeries(1),
    ]).then(r => {
        moviesData = r[0].data.results
        setMovies({ slice: 8, data: moviesData.slice(0, 8) })
    }).catch((e) => console.log(e))
}


export const rightPagination = (current, setCurrent,) => {
    let newCurrent = {}
    newCurrent.data = moviesData.slice(current.slice, current.slice + 8)
    if (newCurrent.data.length < 8) {
        const newSlice = 8 - (newCurrent.data.length - 1)
        moviesPage++
        getMovies(moviesPage).then(r => {
            moviesData = r.data.results

            console.log(newCurrent.data.slice(0, newCurrent.data.length - 1).map(e => e.title))
            console.log(moviesData.slice(0, newSlice).map(e => e.title))

            newCurrent.data =
                [...newCurrent.data.slice(0, newCurrent.data.length - 1),
                ...moviesData.slice(0, newSlice)]
            newCurrent.slice = newSlice
            setCurrent(newCurrent)


        })
    } else {
        newCurrent.slice = current.slice + 8;
        setCurrent(newCurrent)

    }
    // let newCurrent = {}
    // newCurrent.slice = current.slice +8
    // console.log(newCurrent)
    // setCurrent(newCurrent)
}

