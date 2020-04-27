import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ProgressBarAndroid,
  ProgressViewIOS,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        horizontal
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 38.882071,
          longitude: -77.11184,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker
          coordinate={{
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude,
            description: result.name,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.8,
  },
});

export default ResultsShowScreen;
