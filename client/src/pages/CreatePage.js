import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext";

//страница создание сокращенной ссылки
export const CreatePage = () => {

    const history = useHistory();

    const auth = useContext(AuthContext);

    const {request} = useHttp();

    const [link, setLink] = useState('');


    const pressHandler = async (event) => {
            try {

                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);

            }catch (e) {

            }
    };

    return(
        <div className="row">
            <div className="col s offset-s2">
                <div className="input-field">
                    <input
                        value={link}
                        placeholder="Ссылка"
                        id="link"
                        type="text"
                        name="link"
                        onChange={(event)=>{setLink(event.target.value)}}
                    />
                    <button onClick={pressHandler}className="btn ">Сократить</button>
                </div>
            </div>
        </div>
    );
};