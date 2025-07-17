/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>keyboardHeight: {keyboardHeight}</Text>
      <TextInput style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }} 
        keyboardType='numeric'
        secureTextEntry={true}
      />
      <TextInput style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }} 
        keyboardType='visible-password'
        secureTextEntry={false}
      />
    </View>
  )
}
export default App;
