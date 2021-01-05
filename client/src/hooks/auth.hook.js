import {useState, useCallback, useEffect} from 'react'


export const useAuth = () => {

    const storageName = 'userData'

    const [ready, setReady] = useState(false );
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);


    const login = useCallback((jwtToken, id) => {

        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}));

    }, []);

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {

            login(data.token, data.userId);

        };

        setReady(true);

    },[login]);


    const logout = useCallback((token, userId) => {

        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);

    }, []);

    return { login, logout, token, userId, ready };

};