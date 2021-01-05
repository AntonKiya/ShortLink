import React, {useState, useCallback, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {Loader} from '../components/Loader';
import {LinkCard} from "../components/LinkCard";
import {AuthContext} from "../context/AuthContext";
//страница с информацией по определенной ссылке
export const DetailsPage = () => {

    const {token} = useContext(AuthContext);

    const linkId = useParams().id;
    const [link, setLink] = useState(null);

    const {request, loading} = useHttp();

    const getLink = useCallback(async () => {
        try{

             const linkItem = await request(`/api/link/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`});
            console.log(linkItem);
             setLink(linkItem);
        }catch (e) {

        }
    },[token, linkId, request]);


    // ???
    useEffect(() => {

        getLink();

    }, [getLink]);

    if (loading) {
        return <Loader />;
    };

    return(
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    );
};