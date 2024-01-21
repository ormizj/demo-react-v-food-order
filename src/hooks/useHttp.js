import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
    const res = await fetch(url, config);
    const resData = await res.json();

    if (!res.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const clearData = () => {
        setData(initialData);
    }

    const sendRequest = useCallback(async (bodyData) => {
        setIsLoading(true);

        try {
            const resData = await sendHttpRequest(url, { ...config, body: bodyData });
            setData(resData);

        } catch (error) {
            setError(error.message || 'Something went wrong!'); // error should always have a message, but just in-case
        }

        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if (config && config.method === 'GET' || !config.method || !config) { // only "GET" requests will be called instantly 
            sendRequest();
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    }
}

export default useHttp;