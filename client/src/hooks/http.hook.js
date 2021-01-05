import {useState, useCallback} from 'react';


export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        try{

            //приводим body к строке
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            setLoading(true);
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false);

            return data;

        }catch (e){
            setLoading(false);
            setError(e.message);

            //выкидываем ошибку чтобы обрабатывать в компонентах
            throw e;
        }

    }, []);

    const clearError = () => setError(null);

    return { loading, request, error, clearError };
};