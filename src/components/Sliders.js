import React, { useState } from 'react'
import { rightPagination, leftPagination } from "../functions/MDB"
import Link from 'next/link';
export default function Movies({ posters, setPosters, type }) {
  const [imgHover, setImgHover] = useState(null)
  const [leftHover, setLeftHover] = useState(false)
  const [rightHover, setRightHover] = useState(false)

  return (
    <div id="trendingSliders">
      {posters.moved ?
        <div className="pagination" onClick={() => leftPagination(posters, setPosters, setLeftHover)}
          style={leftHover ? { background: "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,90))", left: "-10px" }
            : { left: "-10px" }}> <div className='arrow'
              onMouseEnter={() => setLeftHover(true)}
              onMouseLeave={() => setLeftHover(false)}>{"<"} </div></div> : null
      }

      {posters && posters.data.map((e, i) => {
        const imgSrc = "https://image.tmdb.org/t/p/original" + e.backdrop_path
        const posterSrc = "https://image.tmdb.org/t/p/original" + e.poster_path

        return (
          <Link className='posters'
            href={`/${type}/` + posters.data[i].id}
            key={i}
            onMouseEnter={() => { setImgHover(i) }}
            onMouseLeave={() => { setImgHover(null) }}
            style={imgHover === i ? {
              transform: "scale(1.3)",
              backgroundImage: `url(${imgSrc})`,
              width: "500px"
            } : { backgroundImage: `url(${posterSrc})` }
            }
          >
            {imgHover === i ?
              <div className="shadow-cover">
                <div className='shadow-child-one'>
                  <div className='shadow-child-two'>
                    <img width="100%"
                      src={"https://cdn.discordapp.com/attachments/1010012975253422103/1070249940565102662/time.png"} />
                    <img style={{ width: "100%", marginLeft: '10px' }}
                      src={"https://cdn.discordapp.com/attachments/1010012975253422103/1070249940787404841/check_1.png"} />
                  </div>
                </div>
                <div className='txt'>
                  <h2 className='title'>
                    {e.title ? e.title : e.name}
                  </h2>
                  <div className='overview' >
                    {e.overview.length > 100 ? e.overview.slice(0, 100) + " ..." : null}
                  </div>
                </div>
              </div> : null}

          </Link>
        )
      })}
      < div className="pagination"
        onClick={() => rightPagination(posters, setPosters)}
        style={rightHover ? { background: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,90))", right: "-50px" }
          : { right: "-50px" }}> <div onMouseEnter={() => setRightHover(true)} onMouseLeave={() => setRightHover(false)}
            style={{ position: "relative", top: "90px", right: "-60px" }}>{">"} </div></div>

    </div >
  )
}
