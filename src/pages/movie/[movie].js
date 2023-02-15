import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getById } from '@/functions/MDB';
import { handleLibrary, getMediaFromLibrary } from '@/functions/Login'
import { getTrailer } from '@/functions/youtube'
import Layout from '@/components/Layout';


function Loading() {
    return (
        <div className="loading"><div></div><div></div><div></div></div>
    )
}

export default function movie() {
    const dataFetchedRef = useRef(false);
    const [loginModal, setLoginModal] = useState(false)
    const [user, setUser] = useState(null);;
    const [library, setLibrary] = useState("Add to Library")
    const [media, setMedia] = useState({})
    const [loading, setLoading] = useState(false);

    let local;

    useEffect(() => {
        if (dataFetchedRef.current) return;
        local = JSON.parse(localStorage.getItem('user'))
        setUser(local)


        dataFetchedRef.current = true;
    }, []);

    useEffect(() => {
        getMediaFromLibrary(window, user, library, setLibrary)
        getById(window, user && user.planned, user && user.watched, setLibrary, setMedia)
    }, [user]);
    return (
        <Layout loginModal={loginModal} setLoginModal={setLoginModal} user={user} setUser={setUser}>
            <div id="media-details" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
            }}>
                <div className='container'>
                    <div className='details'>
                        <h1 className="title" >
                            {media.title || media.name}
                        </h1>
                        <div className='body'>
                            <button className='trailer'
                                onClick={() => {
                                    getTrailer(window, setLoading, media.title || media.name)
                                }}>{loading ? <Loading /> : "Watch Trailer"}</button>
                            <button className='library'
                                style={library === "Planned" ? { backgroundColor: "#ffd700" } : library === "Watched" ? { backgroundColor: "green" } : {}}
                                onClick={() => handleLibrary(window, media, user, setUser, library, setLibrary, setLoginModal)}>
                                {library}</button>
                        </div>
                        <div style={{ marginTop: "20vh" }}>
                            <div className='genres'>
                                {media.production_companies && media.genres.map((e, i) => {
                                    if (i === 0) {
                                        return <span key={i}> {e.name + " "} &nbsp; {media.genres.length > 1 ? " |" : null}</span>
                                    }
                                    else if (i === media.genres.length - 1) {
                                        return <span key={i} > &nbsp; {e.name}</span>
                                    }
                                    else {
                                        return <span key={i} > &nbsp; {e.name} &nbsp;{" |"}</span>
                                    }
                                })}
                            </div>

                            <div className='dates-section'>
                                <span>{media.runtime} min</span>
                                <span className='dates'>{media.release_date ? media.first_air_date ?
                                    media.first_air_date.slice(0, 4) : media.release_date.slice(0, 4) : null}</span>
                                <span className='dates'>
                                    {media.vote_average && media.vote_average.toString().slice(0, 3)}
                                    <img className='imdb'
                                        src='https://cdn.discordapp.com/attachments/1010012975253422103/1070434900953550920/pngwing.com.png' />

                                </span>
                            </div>
                        </div>



                        <div className='languages'>
                            Languages
                            <div>
                                {media.spoken_languages && media.spoken_languages.map((e, i) => {
                                    if (i === 0) {
                                        return <span key={i}> {e.english_name + " "} &nbsp;
                                            {media.spoken_languages.length > 1 ?
                                                " |" : null}</span>
                                    }
                                    else if (i === media.spoken_languages.length - 1) {
                                        return <span key={i}>  &nbsp; {e.english_name}</span>
                                    }
                                    else {
                                        return <span key={i}>  &nbsp; {e.english_name}  &nbsp; {" |"}</span>
                                    }
                                })}
                            </div>
                        </div>


                        <div className='producers'>
                            Producers
                            <div>
                                {media.production_companies && media.production_companies.map((e, i) => {
                                    if (i === 0) {
                                        return <span key={i}> {e.name + " "}&nbsp;
                                            {media.production_companies.length > 1 ?
                                                " |" : null}</span>
                                    }
                                    else if (i === media.production_companies.length - 1) {
                                        return <span key={i}> &nbsp; {e.name}</span>
                                    }
                                    else {
                                        return <span key={i}> &nbsp;{e.name} &nbsp; {" |"}</span>
                                    }
                                })}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div id="overview-section">
                            <h1 className='tagline'>{media.tagline}</h1>
                            <div className='overview'>
                                {media.overview}
                            </div>
                            <div className='start-watching'>
                                <a href={media.homepage}>start watching</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='shadow-details' />


            </div>
        </Layout >
    )
}
