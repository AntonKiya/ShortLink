import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const { loading, request } = useHttp();

    const [form, setForm] = useState({
        email: '', password: ''
    });

    const registerHandler = () => {
        try {
            const data = request('/api/auth/register', 'POST', {...form});
            console.log('Data: ' + data);

        //пустой catch так как мы уже обработали его в useHttp
        }
        catch (e){}
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            await console.log('Data: ' + JSON.stringify(data));

            auth.login(data.token, data.userId)

            //пустой catch так как мы уже обработали его в useHttp
        }
        catch (e){}
    };

    const changeHandler = (event) => {

        const target = event.target;
        const value = target.value;

        setForm({...form, [target.name]: value});

    };

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="row">
                    <div>
                        <div className="card blue darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Авторизация</span>
                                <div>

                                    <div className="input-field">
                                        <input
                                            onChange={changeHandler}
                                            value={form.email}
                                            placeholder="Email"
                                            id="email"
                                            type="text"
                                            name="email"
                                        />
                                    </div>

                                    <div className="input-field">
                                        <input
                                            onChange={changeHandler}
                                            value={form.password}
                                            placeholder="Пароль"
                                            id="password"
                                            type="password"
                                            name="password"
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card-action">
                                <button
                                    className="btn green darken-1"
                                    style={{'marginR ight': 10}}
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Войти
                                </button>
                                <button
                                    className="btn yellow darken-4"
                                    disabled={loading}
                                    onClick={registerHandler}
                                >
                                    Регистрация
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};