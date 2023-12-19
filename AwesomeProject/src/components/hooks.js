export const useHooks = () => {
  const makeApiCall = async () => {
    try {
      let res = {};
      const resp = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip.current}`,
      );
      const json = await resp.json();
      // set total
      if (json.skip === 0) {
        res.data = json.products;
      } else {
        if (json.products) {
          res.data = [...res.data, ...json.products];
        }
      }
      res.metaData = {
        total: json.total,
        skip: json.skip,
      };
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const useGetProduct = () => {
    makeApiCall();
  };
  return {useGetProduct};
};
