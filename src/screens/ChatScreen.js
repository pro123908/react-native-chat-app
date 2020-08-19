import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebase from '../../Firebase';

const ChatScreen = ({navigation}) => {
  console.log('Navigation => ', navigation);
  const [messages, setMessages] = useState([]);

  const user = () => {
    return {
      _id: Firebase.uid,
      name: navigation.state.params.name,
    };
  };

  useEffect(() => {
    Firebase.get((message) =>
      setMessages((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );

    return () => {
      Firebase.off();
    };
  }, []);

  const chat = (
    <GiftedChat messages={messages} onSend={Firebase.send} user={user} />
  );

  if (Platform.OS === 'android') {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled>
        {chat}
      </KeyboardAvoidingView>
    );
  }
  return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
};

export default ChatScreen;

const styles = StyleSheet.create({});
