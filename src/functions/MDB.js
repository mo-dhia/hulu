import axios from "axios";
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
    setSubject(r[1].data.results[0])
    data.movies = r[0].data.results
    setMovies({ slice: 8, data: data.movies.slice(0, 8), type: 'movies' })
    data.series = r[1].data.results
    setSeries({ slice: 8, data: data.series.slice(0, 8), type: 'series' })
  }).catch((e) => console.log(e))
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
  console.log(current.slice)
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





