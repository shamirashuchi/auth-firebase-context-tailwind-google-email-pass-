import React, { useContext } from 'react';
import { AuthContext } from '../providers/Authproviders';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';
const auth = getAuth(app);
const Home = () => {
    const user = useContext(AuthContext);
    return (
        <div>
            <h2>This is home component{user && <span>{user.displayName}</span>}</h2>
        </div>
    );
};

export default Home;