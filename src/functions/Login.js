import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDocs, collection, query, where, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const firebaseMapper = (obj) => {
    let result = {}
    result.id = obj.docs[0].id
    const reducer = (obj, result) => {
        for (let k in obj) {
            if (obj[k].arrayValue) {
                if (Object.keys(obj[k].arrayValue).length) {
                    obj[k].arrayValue.values.forEach((e, i) => {
                        if (i === 0) {
                            result[k] = []
                            result[k][i] = {}
                            reducer(e.mapValue.fields, result[k][i])

                        }
                        else {
                            result[k][i] = {}
                            reducer(e.mapValue.fields, result[k][i])
                        }
                    });
                } else {
                    result[k] = []
                }
            } else {
                if (obj[k].integerValue) { result[k] = obj[k].integerValue }
                else if (obj[k].stringValue) { result[k] = obj[k].stringValue }
            }
        }
    }


    reducer(obj.docs[0]._document.data.value.mapValue.fields, result)
    return result
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const users = collection(db, "users");

export const GoogleAuth = (setUser, setModal, setError) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user

            const q = query(users, where("email", "==", result.user.email));
            getDocs(q).then((e) => {
                if (!e.size) {
                    const newUser = {
                        name: user.displayName, email: user.email, planned: [], watched: []
                    }
                    setDoc(doc(users, user.uid), newUser)
                        .then(() => {
                            newUser.id = user.uid
                            setUser(newUser);
                            localStorage.setItem('user', JSON.stringify(newUser));
                            setModal(false);
                        });
                } else {
                    const user = firebaseMapper(e)
                    setUser(user)
                    localStorage.setItem('user', JSON.stringify(user));
                    setModal(false);
                    setError(null)
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
};
export const signup = (name, password, passwordChecker, setUser, setModal, setError) => {
    if (!name) { setError("add a name please") }
    else if (!password) { setError("add a password please") }
    else if (password !== passwordChecker) { setError("passwords not matching") }
    else {
        const q = query(collection(db, "users"), where("name", "==", name));
        getDocs(q).then((e) => {
            if (e.size) {
                let exist = false
                for (let i = 0; e.docs.length > i; i++) {
                    if (!e.docs[i]._document.data.value.mapValue.fields.email) {
                        exist = true
                    }
                }
                if (!exist) {
                    const newUser = { name: name, password: password, planned: [], watched: [] }
                    setDoc(doc(users), newUser)
                        .then(() => {
                            const q = query(collection(db, "users"), where("name", "==", name), where("password", "==", password));
                            getDocs(q).then((e) => {
                                newUser.id = e.docs[0].id
                                setUser(newUser); localStorage.setItem('user', JSON.stringify(newUser)); setModal(false); setError(null)
                            })
                        })
                }
                else { setError("username already exist.") }
            }
            else {
                const newUser = { name: name, password: password, planned: [], watched: [] }
                setDoc(doc(users), newUser)
                    .then(() => {
                        const q = query(collection(db, "users"), where("name", "==", name), where("password", "==", password));
                        getDocs(q).then((e) => {
                            newUser.id = e.docs[0].id
                            setUser(newUser); localStorage.setItem('user', JSON.stringify(newUser)); setModal(false); setError(null)
                        })
                    })
            }
        })
    }
}

export const signin = (name, password, setUser, setModal, setError) => {
    const q = query(collection(db, "users"), where("name", "==", name), where("password", "==", password));
    getDocs(q).then((e) => {
        if (!e.size) {
            setError("password or name does not match.")
        } else {
            const user = firebaseMapper(e)
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user));
            setModal(false); setError(null)
        }
    })
}

export const update = (user, googleUser, name, setUser, password, passwordChecker, setError, setModal) => {
    if (!name) { setError("add a name please") }
    else if (!googleUser && !password) { setError("add a password please") }
    else if (!googleUser && (password !== passwordChecker)) { setError("passwords not matching") }
    else {
        const docRef = doc(db, "users", user.id)

        const q = query(collection(db, "users"), where("name", "==", name));
        getDocs(q).then((e) => {
            if (e.size) {
                let exist = false
                for (let i = 0; e.docs.length > i; i++) {
                    if (e.docs[i]._document.data.value.mapValue.fields.email) {
                        exist = true
                    }
                }
                if (!exist) {
                    updateDoc(docRef, {
                        name: name,
                        password: password
                    }).then(() => {
                        user.name = name;
                        user.password = password
                        setUser(user);
                        setModal(false)
                    })
                }
                else { setError("username already exist.") }
            }
            else {
                updateDoc(docRef, {
                    name: name
                }).then(() => {
                    user.name = name;
                    setUser(user);
                    setModal(false)
                })
            }
        })
    }



}


