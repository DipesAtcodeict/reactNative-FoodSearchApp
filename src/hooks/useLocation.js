import * as Location from 'expo-location';

export default async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    return 'error vayo';
  }
  let result = await Location.getCurrentPositionAsync({});
  return result;
};
