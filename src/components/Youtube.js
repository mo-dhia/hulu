import React, { useState, useEffect } from 'react'
import { hideYtBorderAlgo, overviewSlicer } from "../functions/youtube"
export default function Youtube({ subject }) {
    const [ytCamouflagePosition, setYtCamouflagePosition] = useState(0)

    useEffect(() => {
        hideYtBorderAlgo(setYtCamouflagePosition, window.innerWidth)
    },)

    return (
        <div id='youtube' style={{ top: `-${ytCamouflagePosition + 16}vh` }}>
            {/* <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${yt}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${yt}`}
                frameborder="0" /> */}
            <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${"uLtkt8BonwM"}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${"uLtkt8BonwM"}`}
                frameborder="0" />
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
