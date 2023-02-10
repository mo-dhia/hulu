import React from 'react'
import Link from 'next/link'

export default function MenuDropdown({ setModal }) {
    return (
        <div id='menuDropdown'>
            <div className='box param'>
                <div className='txt'>
                    <Link onClick={() => setModal(false)}
                        href="/">HOME
                    </Link>
                </div>
            </div>
            <div className='box stuff'>
                <div className='txt'>
                    <Link onClick={() => setModal(false)}
                        href="/prefrences">MY STUFF
                    </Link>
                </div>
            </div>


            <div className='box browse'>
                <div className='txt' onClick={() => { setUser(null); localStorage.removeItem('user'); }}>
                    <Link onClick={() => setModal(false)}
                        href="/browse">BROWSE
                    </Link>
                </div>
            </div>
        </div>
    )
}
