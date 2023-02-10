import { useState } from "react"
import { signup, GoogleAuth, signin } from '../../functions/Login'

export default function Modal({ setUser, setModal, error, setError }) {
    const [name, setName] = useState("")
    const [register, setRegister] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordChecker, setPasswordChecker] = useState("")

    return (
        <div id="modal" >
            <div className='shutDownButton' onClick={() => { setModal(false); setRegister(false) }}> x</div>
            {/* xxbutton */}

            <h2> name </h2>
            <br />
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <h2> password </h2>
            <br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        if (register) {

                            signup(name, password, passwordChecker, setUser, setModal, setError)
                        } else {
                            signin(name, password, setUser, setModal, setError)
                        }
                    }
                }} />
            {register ?
                <div>
                    <input value={passwordChecker} onChange={(e) => setPasswordChecker(e.target.value)} type="password"
                        style={{ marginTop: "8px" }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                signup(name, password, passwordChecker, setUser, setModal, setError)
                            }
                        }} />
                </div> : null}
            {!register ? <h2 onClick={() => signin(name, password, setUser, setModal, setError)} className="login">login</h2>
                : null

            }
            <h2 onClick={() => {
                if (!register) {
                    setRegister(true)
                }
                else {
                    signup(name, password, passwordChecker, setUser, setModal, setError)
                }
            }} style={!register ? { marginTop: "0px" } : null} className="login">
                {!register ? "sign up" : "confirm"}
            </h2>
            <h2 onClick={() => GoogleAuth(setUser, setModal, setError)}
                className="login google">{register ? "signup" : "login"} with Google</h2>




            {error ? <div id="error">{error}</div> : null}




        </div>
    )
}
