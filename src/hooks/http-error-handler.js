import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // for ComponentWillMount there is no hook just delete it and thats it
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });
    // ComponentWillUnmount needs [] at the end to unmount
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor)
            httpClient.interceptors.response.eject(resInterceptor)
        }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };
    return [error, errorConfirmedHandler];
}