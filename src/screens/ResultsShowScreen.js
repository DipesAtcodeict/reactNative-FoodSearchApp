import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ProgressBarAndroid,
  ProgressViewIOS,
} from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return Platform.OS === 'android' ? (
      <ProgressBarAndroid style={styles.progressBar} />
    ) : (
      <ProgressViewIOS style={styles.progressIOS} />
    );
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
    margin: 30,
  },
  progressIOS: {
    width: 200,
  },
});

export default ResultsShowScreen;
