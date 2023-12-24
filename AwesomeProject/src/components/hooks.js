import {useEffect, useState} from 'react';

export const useHooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const useFetch = url => {
    const [pageInfo, setPageInfo] = useState();

    const makeApiCall = async () => {
      try {
        setLoading(true);
        const resp = await fetch(``);
        const json = await resp.json();
        // set total
        if (json.skip === 0) {
          setData(json.products);
        } else {
          if (json.products) {
            setData([...data, ...json.products]);
          }
        }
        setPageInfo({
          total: json.total,
          skip: json.skip,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      makeApiCall();
    }, []);
  };
  return {useFetch, loading, error, data, pageInfo};
};
