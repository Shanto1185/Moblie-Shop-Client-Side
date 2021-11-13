import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, getIdToken, signOut } from "firebase/auth";
import initialiazeAuthentication from "../Pages/Authentication/Firebase/Firebase.init";
import { useEffect, useState } from 'react';

initialiazeAuthentication();

const useFirebase = () => {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('')

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const loginWithGoogl = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);

                //save user to the database
                saveUser(user.email, user.displayName, "PUT");

                //redirecting
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setError('')
            })
            .finally(() => setIsLoading(false));
    }


    const handleCreteNewUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setError('')
                const user = { email, displayName: name }
                setUser(user);
                //save user to the database
                saveUser(email, name, "POST");
                //send namae to fireabase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => { })
                    .catch((error) => { });
                //redirecting
                history.replace('/')

            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const handleOldLogin = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                //redirecting
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setError('')
            })

            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        console.log(idToken)
                        setToken(idToken)
                    })
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://aqueous-reef-70969.herokuapp.com/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user?.email])





    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({})
                setError('')
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://aqueous-reef-70969.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        error,
        isLoading,
        admin,
        token,
        loginWithGoogl,
        handleCreteNewUser,
        handleOldLogin,
        logOut
    }


}
export default useFirebase;