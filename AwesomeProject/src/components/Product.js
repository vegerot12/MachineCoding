import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
const Product = ({data, setFav}) => {
  return (
    <View style={styles.container}>
      <Text>LIST</Text>
      <View style={styles.prodInfo}>
        <Image source={{uri: data?.thumbnail}} style={styles.image} />
        <View>
          <Text>{data.description}</Text>
          <Pressable onPress={() => setFav(data.id)}>
            <Text>{data.fav ? 'x' : 'add'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  prodInfo: {
    flexDirection: 'row',
  },
});

export default Product;
