import React, { useState, useEffect } from 'react'
import { hideYtBorderAlgo, overviewSlicer, getTrailer } from "../functions/youtube"
export default function Youtube({ subject }) {
    const [ytCamouflagePosition, setYtCamouflagePosition] = useState(0)

    useEffect(() => {
        hideYtBorderAlgo(setYtCamouflagePosition, window.innerWidth);
        // getTrailer(null, null, subject.name || subject.title, subject, setHpTrailer)

    }, [])

    return (
        <div id='youtube' style={{ top: `-${ytCamouflagePosition + 16}vh` }}>

            {/* <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${homepageTrailer}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${homepageTrailer}`}
                frameborder="0" /> */}

            {subject.youtube ? <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${subject.youtube}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${subject.youtube}`}
                frameborder="0" /> : null}
            <div id="subject">
                <h1 id="title">
                    {subject && (subject.name ? subject.name : subject.title)}
                </h1>
                <div id="overview">
                    {subject && overviewSlicer(subject.overview)}
                </div>
            </div>
            <div id="camouflage" style={{ bottom: `${ytCamouflagePosition - 12}vh` }}>

            </div>
            <div id="subject-shadow" />
        </div>
    )
}
