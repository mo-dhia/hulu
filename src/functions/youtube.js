import axios from "axios";



export const hideYtBorderAlgo = (setYtCamouflagePosition, n) => {
    const x = 1629;
    const y = -12;
    setYtCamouflagePosition(((x - n) / 50) - y)
}

export const overviewSlicer = (overview) => {
    if (overview.length > 190) {
        return overview.slice(0, 190) + "..."
    }
    else {
        return overview
    }
}

export const getTrailer = (window, setLoading, name, subject, setSubject) => {
    let type;
    let id;
    if (window) {
        setLoading(true);
        type = window.location.pathname.slice(1, 6)
        id = window.location.pathname.slice(7)
    } else {
        type = subject.type;
        id = subject.id;
    }

    axios.
        get(`https://api.themoviedb.org/3/${type === 'serie' ? 'tv' : type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_MDB_API_KEY}&language=en-US`).then(r => {
            const data = r.data.results
            let official;
            let unOfficial;
            for (let i = 0; i < data.length; i++) {
                if (data[i].official && data[i].type.toLowerCase().includes("trailer")) {
                    official = data[i].key;
                    action(official)
                    break;
                } else if (data[i].type.toLowerCase().includes("trailer")) {
                    unOfficial = data[i].key;
                }
            }
            if (!official && unOfficial) {
                action(unOfficial)
            }
            else if (!official && !unOfficial) {
                
            }
        }).catch(err => { console.log(err);  })


    function youtubeSearch() {
        axios
            .get(`https://youtube.googleapis.com/youtube/v3/search?key=${"AIzaSyCAvLgjLJQqWe-YXnon0FfujtmGIYzgMs8"}&maxResults=1&q=${name 
            + " official trailer"}`)
            .then((e) => {
                action(e.data.items[0].id.videoId)
            }).catch(err => console.log(err))
    }
    function action(videoId) {
        if (window) {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
            setLoading(false)
        } else {
            setSubject({ ...subject, youtube: videoId })
        }
    }
}

