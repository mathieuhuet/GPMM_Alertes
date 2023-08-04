import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, Keyboard, ScrollView, Pressable, Platform, View } from 'react-native';
import PressableText from '../texts/pressableText';


interface Props {
  children: React.ReactNode;
}

const KeyboardAvoidingContainer: FunctionComponent<Props> = (props) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1,
        backgroundColor: 'transparent',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={Keyboard.dismiss}
        >
          {props.children}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingContainer;