import { useState, useEffect } from 'react';


// tried making a custom react hook for fetching data but didnt actually use it later on
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortControl = new AbortController();

        fetch(url, { signal: abortControl.signal }).then(res => {
            if (!res.ok) {
                throw Error('noob')
            }
            return res.json();
        })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                }
                else {
                    setIsPending(false);
                    setError(err.message);
                }

            })

        return () => abortControl.abort(); // abort whatever fetch it is associated with
    }, [url])

    return { data, isPending, error }
}

export default useFetch;