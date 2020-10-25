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
import Fire from '../../Firebase';

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.route.params.name,
    };
  }
  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.send}
        user={this.user}
      />
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
  }
}

// const ChatScreen = ({navigation}) => {
//   console.log('Navigation => ', navigation);
//   const [messages, setMessages] = useState([]);

//   const user = () => {
//     return {
//       _id: Fire.uid,
//       name: navigation.state.params.name,
//     };
//   };

//   useEffect(() => {
//     Fire.get((message) =>
//       setMessages((previous) => ({
//         messages: GiftedChat.append(previous.messages, message),
//       })),
//     );

//     return () => {
//       Fire.off();
//     };
//   }, []);

//   const chat = (
//     <GiftedChat messages={messages} onSend={Fire.send} user={user} />
//   );

//   if (Platform.OS === 'android') {
//     return (
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior="padding"
//         keyboardVerticalOffset={30}
//         enabled>
//         {chat}
//       </KeyboardAvoidingView>
//     );
//   }
//   return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
// };

// export default ChatScreen;

const styles = StyleSheet.create({});
