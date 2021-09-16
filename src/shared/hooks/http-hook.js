import { useState, useCallback, useRef, useEffect, useContext } from 'react';


export const useHttpClient = () => {


    const [isLoading, setIsLoading] = useState(false);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrll = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrll);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });
            console.log(response);
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll);

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(responseData.message);
            }
            setIsLoading(false);

            return responseData;

        } catch (e) {
            setIsLoading(false);
            console.log(e);
            if (e.message !== 'Fetch is aborted' && e.message !== 'The user aborted a request.') {
                console.log(e.message);
            }
            throw e;
        }



    }, [alert]);

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, sendRequest };
};