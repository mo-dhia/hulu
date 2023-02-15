import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';


export default function movie() {
    const dataFetchedRef = useRef(false);
    const [loginModal, setLoginModal] = useState(false)
    const [user, setUser] = useState(null);;

    let local;

    useEffect(() => {
        if (dataFetchedRef.current) return;
        local = JSON.parse(localStorage.getItem('user'))
        setUser(local)


        // dataFetchedRef.current = true;
    }, []);
    useEffect(() => {
    }, [user]);
    return (
        <Layout loginModal={loginModal} setLoginModal={setLoginModal} user={user} setUser={setUser}>
            {!user ? <div style={{ height: "90vh" }}>
                <h1 onClick={() => setLoginModal(true)} style={{
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                    fontSize: "50px",
                    position: "absolute",
                    textDecoration: "underline",
                    cursor: "pointer"
                }}> Get Your Own Library</h1>
            </div> :
                <div>
                    qsdsqd
                </div>}
        </Layout >
    )
}
