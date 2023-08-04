import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import { changeName } from '../../services/userServices/changeName';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import StyledTextInput from '../../components/inputs/styledTextInputs';
import MessageBox from '../../components/texts/messageBox';
import MessageModal from '../../components/modals/messageModal';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';




const ChangeName: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');

  // TODO changing all those useState into a single useReducer
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');

  const modalButtonHandler = async () => {
    setModalVisible(false);
    if (modalMessageType === 'success') {
      navigation.navigate('More');
    }
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleChangeName = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    changeName(credentials, user.accessToken).then(result => {
      if (result.data) {
        dispatch({ type: 'SET_NAME', payload: {firstName: result.data.firstName, lastName: result.data.lastName}});
        return showModal('success', 'All Good!', 'Your name has been updated.', 'Proceed');
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
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white}} >
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.darkGreen}}>
            Change Name
          </LargeText>  
          <Formik
            initialValues={{firstName: user.firstName, lastName: user.lastName}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.firstName === "") {
                setMessage('Please fill all the required fields.');
                setSubmitting(false);
              } else {
                handleChangeName({firstName: values.firstName, lastName: values.lastName}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <>
                <StyledTextInput
                  label="First name"
                  icon="account"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.lightGreen}
                  labelStyle={{color: colors.lightGreen}}
                />
                <StyledTextInput
                  label="Last name (optional)"
                  icon="account"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.lightGreen}
                  labelStyle={{color: colors.lightGreen}}
                />
                <MessageBox
                  textStyle={{ marginBottom: 20, marginTop: 20 }}
                >
                  { message || ' ' }
                </MessageBox>
                {isSubmitting && <RegularButton
                  style={{marginBottom: 10, backgroundColor: colors.darkGreen}}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.darkGreen}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.darkGreen}}
                >
                  Change Name
                </RegularButton>}
              </>
            )}
          </Formik>
          <MessageModal
            headerText={modalHeaderText}
            message={modalMessage}
            modalVisible={modalVisible}
            type={modalMessageType}
            buttonText={modalButtonText}
            buttonHandler={modalButtonHandler}
          />
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default ChangeName;