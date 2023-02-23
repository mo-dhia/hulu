import axios from "axios";
import { getTrailer } from "./youtube"
let data = {
  movies: [],
  series: [],
  moviesPage: 1,
  seriesPage: 1,
  getmovies: (page) => {
    return axios.
      get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&page=${page}`)
  },
  getseries: (page) => {
    return axios
      .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&page=${page}`)
  }
}
export const getTrendings = (setMovies, setSeries, setSubject) => {

  Promise.all([
    data.getmovies(1),
    data.getseries(1),
  ]).then(r => {
    const random = Math.floor(Math.random() * 8)
    let subject = [...r[0].data.results.slice(0, 4), ...r[1].data.results.slice(0, 4)][random]
    subject.type = random > 3 ? "tv" : "movie"
    console.log(r[1].data.results[0])

    getTrailer(null, null, subject.name || subject.title, subject, setSubject)
    data.movies = r[0].data.results
    setMovies({ slice: 8, data: data.movies.slice(0, 8), type: 'movies' })
    data.series = r[1].data.results
    setSeries({ slice: 8, data: data.series.slice(0, 8), type: 'series' })
  }).catch((e) => console.log(e))
}


export const getById = (window, planned, watched, setLibrary, setMedia) => {
  const type = window.location.pathname.slice(1, 6)
  const id = window.location.pathname.slice(7)

  axios.get(`https://api.themoviedb.org/3/${type === "serie" ? "tv" : type}/${id}?api_key=48586718f1619baec6911ced95941d83&language=en-US`)
    .then(r => {
      setMedia(r.data)
      if (planned || watched) {
        let condition;
        for (let i = 0; planned.length > i; i++) {
          if (planned[i].id === r.data.id && type === planned[i].type) {
            condition = true
            setLibrary("Planned")
            break;
          }
        }
        if (!condition) {
          for (let i = 0; watched.length > i; i++) {
            if (watched[i].id === r.data.id && type === watched[i].type) {
              setLibrary("Watched")
              break;
            }
          }
        }
      }
    })
}
















export const rightPagination = (current, setCurrent) => {
  let newCurrent = {};
  newCurrent.data = data[current.type].slice(current.slice, current.slice + 8);
  newCurrent.moved = true
  newCurrent.type = current.type
  if (newCurrent.data.length < 8) {
    data[current.type + "Page"]++;
    data["get" + current.type](data[current.type + "Page"]).then((r) => {
      newCurrent.cache = newCurrent.data.length;
      data[current.type] = [...newCurrent.data, ...r.data.results];
      newCurrent.data = data[current.type].slice(0, 8);
      newCurrent.slice = 8;
      setCurrent(newCurrent);
    });
  } else {
    newCurrent.slice = current.slice + 8;
    setCurrent(newCurrent);
  }
};

export const leftPagination = (current, setCurrent, setLeftHover) => {
  if (current.moved) {
    data["get" + current.type](1).then(r => {
      data[current.type + "Page"] = 1
      data[current.type] = r.data.results
      setCurrent({ slice: 8, data: data[current.type].slice(0, 8), moved: false, type: current.type })
    }).catch((e) => console.log(e))
  } else {
    setCurrent({ slice: 8, data: data[current.type].slice(0, 8), moved: false, type: current.type })
  }
  setLeftHover(false)
};





