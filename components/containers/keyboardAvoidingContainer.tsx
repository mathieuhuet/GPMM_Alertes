import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, Keyboard, ScrollView, Pressable, Platform, View, StyleProp, ViewStyle } from 'react-native';


interface Props {
  children: React.ReactNode;
  scrollStyle?: StyleProp<ViewStyle>;
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
        contentContainerStyle={props.scrollStyle}
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