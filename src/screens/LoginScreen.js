import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');

  continueFunction = () => {
    navigation.navigate('Chat', {name});
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{marginTop: 60}}>
        <Image
          source={require('../assets/chat.png')}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
      </View>
      <View style={{marginHorizontal: 30}}>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="ChatApp"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={{alignItems: 'flex-end', marginTop: 60}}>
          <TouchableOpacity style={styles.continue} onPress={continueFunction}>
            <Ionicons name="md-arrow-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -20,
    left: -90,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#514E5A',
    marginTop: 32,
  },

  input: {
    height: 50,
    marginTop: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514E5A',
    fontWeight: '400',
  },

  continue: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#9075E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
