import React from 'react'
import { useState } from "react"
import { update } from '../../functions/Login'

export default function editModal({ user, setUser, setModal, error, setError }) {
    const [name, setName] = useState(user ? user.name ? user.name : "" : "")
    const [googleUser, setGoogleUser] = useState(user ? user.email ? true : false : false)
    const [password, setPassword] = useState(user ? user.password ? user.password : "" : "")
    const [passwordChecker, setPasswordChecker] = useState("")
    return (
        <div id="editModal" style={googleUser ? { height: "35vh" } : null} >
            <div className='shutDownButton' onClick={() => { setModal(false); setGoogleUser(false) }}> x</div>
            {/* xxbutton */}

            <h2> name </h2>
            <br />
            <input value={name} onChange={(e) => setName(e.target.value)} />

            {!googleUser ?
                <div>

                    <h2> password </h2>
                    <br />

                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                update(user, googleUser)
                            }
                        }} />
                    <input value={passwordChecker} onChange={(e) => setPasswordChecker(e.target.value)} type="password"
                        style={{ marginTop: "8px" }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                update(user, googleUser)
                            }
                        }} />
                </div> : null}

            <h2 onClick={() => {
                update(user, googleUser, name, setUser, password, passwordChecker, setError, setModal)
            }} className="update">
                update
            </h2>




            <div className="error">{error}</div>




        </div>
    )
}
