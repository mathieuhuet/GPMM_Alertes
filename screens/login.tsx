import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { loginEmail } from '../services/userServices/login';
// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import SmallText from '../components/texts/smallText';
import StyledTextInput from '../components/inputs/styledTextInputs';
import MessageBox from '../components/texts/messageBox';
import RegularButton from '../components/buttons/regularButton';
import PressableText from '../components/texts/pressableText';
import { colors } from '../components/colors';


const Login: FunctionComponent = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const handleLogin = (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    loginEmail(credentials).then(result => {
      if (result.data) {
        const email = result.data;
        navigation.navigate('EmailVerification', email);
      }
      setSubmitting(false);
    }).catch(err => {
      if (err.message) {
        setMessage(err.message);
      }
      console.log(err);
      setSubmitting(false);
    });
  }

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <View>
          
        </View>
        <View>
          <RegularText textStyle={{marginBottom: 25}}>Login with your email address.</RegularText>
          <Formik
            initialValues={{email: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.email === "") {
                setMessage('Please enter your email address.');
                setSubmitting(false);
              } else {
                handleLogin({email: values.email.toLowerCase()}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <StyledTextInput
                  label="Email Address"
                  icon="email-variant"
                  keyboardType="email-address"
                  placeholder="Your email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  inputFieldStyle={{ marginBottom: 20 }}
                />
                <MessageBox
                  textStyle={{ marginBottom: 20 }}
                >
                  { message || ' ' }
                </MessageBox>
                {isSubmitting && <RegularButton>
                  <ActivityIndicator
                    size="small"
                    color={colors.darkGreen}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                >
                  Login
                </RegularButton>}
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Login;