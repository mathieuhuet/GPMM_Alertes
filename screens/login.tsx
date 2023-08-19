import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { loginEmail } from '../services/userServices/login';
import styled from 'styled-components/native';
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
import GPMM_Logo from '../assets/GPMM_logo.webp';
import { ScreenHeight } from '../components/shared';

const Image = styled.Image`
  width: 80%;
  height: ${ScreenHeight * 0.2}px;
`;

interface result {
  data: any;
}

const Login: FunctionComponent = ({ navigation }: any) => {
  const [message, setMessage] = useState('');

  const handleLogin = async (credentials: any, setSubmitting: any) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await loginEmail(credentials) as result;
      if (result.data) {
        const email = result.data;
        navigation.navigate('EmailVerification', email);
      }
      setSubmitting(false);
    } catch (error: any) {
      if (error.message) {
        setMessage(error.message);
      }
      console.log(error);
      setSubmitting(false);
    }
  }

  return (
    <MainContainer
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      <KeyboardAvoidingContainer>
        <View>
          <Image
            source={GPMM_Logo}
            resizeMode='contain'
          />
        </View>
        <View>
          <RegularText textStyle={{marginBottom: 25}}>
            Connectez-vous avec votre courriel GPMM
          </RegularText>
          <Formik
            initialValues={{email: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.email === "") {
                setMessage('Veuillez entrer votre adresse courriel.');
                setSubmitting(false);
              } else {
                handleLogin({email: values.email.toLowerCase()}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <StyledTextInput
                  label="Adresse Courriel"
                  icon="email-variant"
                  keyboardType="email-address"
                  placeholder="xyz@gpmmom.ca"
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
                  Connection
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