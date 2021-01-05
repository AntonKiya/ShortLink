import React, {useContext, useState, useCallback, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";
import {LinksList} from "../components/LinksList";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

//страница вывода список всех ссылок пользователя
export const LinksPage = () => {

    const {token} = useContext(AuthContext);
    const [links, setLinks] = useState(null);

    const {request, loading} = useHttp();

    const getLinks = useCallback(async () => {
        const linksItems = await request('/api/link/', 'GET', null, {Authorization: `Bearer ${token}`});
        setLinks(linksItems);
    }, [token, request]);

    useEffect(() => {
        getLinks();
    },[getLinks]);

    if (loading) {
        return <Loader/>
    }

    return(
            <>
                {!loading && links && <LinksList links={links}/>}
            </>
    );
};