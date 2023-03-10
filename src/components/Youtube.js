import React, { useState, useEffect } from 'react'
import { overviewSlicer } from "../functions/youtube"
export default function Youtube({ subject, ytCamouflagePosition }) {



    return (
        <div id='youtube' style={{ top: `-${ytCamouflagePosition + 16}vh` }}>

            {/* <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${homepageTrailer}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${homepageTrailer}`}
                frameborder="0" /> */}

            {subject.youtube ? <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${subject.youtube}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${subject.youtube}`}
                frameborder="0" /> : null}
            <div className='camouflage' />
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
