import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import Product from '../components/Product';
import {useHooks} from '../components/hooks';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {useGetProduct} = useHooks();
  const skip = useRef(0);
  const metaData = useRef({});

  useEffect(() => {
    getProducts();
  }, []);

  const handleFav = useCallback(
    id => {
      const updatedData = data.map(obj => {
        if (obj.id === id) return {...obj, fav: !obj.fav};
        return obj;
      });
      setData(updatedData);
    },
    [data, setData],
  );

  const handleFilter = () => {
    const updatedData = data.filter(obj => obj.fav === true);
    setData(updatedData);
  };

  const getProducts = async () => {
    setLoading(true);
    setData(useGetProduct());
    setLoading(false);
  };

  const loadMoreItems = () => {
    if (metaData.current.total <= metaData.current.skip) return;
    skip.current = metaData.current.skip + 10;
    getProducts();
  };

  console.log(loading, 'loading');
  const Footer = useMemo(() => {
    return <View>{loading ? <ActivityIndicator size="large" /> : null}</View>;
  }, [loading]);

  const Header = () => {
    return (
      <Pressable onPress={handleFilter}>
        <Text>Filter</Text>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={Header}
        data={data}
        renderItem={({item}) => <Product data={item} setFav={handleFav} />}
        keyExtractor={item => item.id}
        // onEndReached={() => loadMoreItems()}
        // onEndReachedThreshold={0.2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        refreshing={loading}
        progressViewOffset={120}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

export default ProductList;
