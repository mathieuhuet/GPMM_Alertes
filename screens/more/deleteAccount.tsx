import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import StyledTextInput from '../../components/inputs/styledTextInputs';
import MessageModal from '../../components/modals/messageModal';
import { deleteAccount } from '../../services/userServices/deleteAccount';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';





const DeleteAccount: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

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
      dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: ''}});
    }
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleDeleteAccount = async (setSubmitting) => {
    deleteAccount(user.accessToken).then(result => {
      if (result.data) {
        dispatch({ type: 'SET_CREDENTIALS', 
        payload: {
          firstName: '', 
          lastName: '',
          email: '',
          profileIconColor: '', 
          profileIconBackgroundColor: '', 
          profileIconPolice: ''
        }});
        return showModal('success', 'All Good!', 'Your account has been deleted successfully.', 'Proceed');
      }
      setSubmitting(false);
    }).catch(err => {
      console.log(err);
      setSubmitting(false);
      return showModal('failed', 'Uh oh...', err.message, 'OK');
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.white}} >
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.lightGreen, textAlign: 'center'}}>
            Delete Account
          </LargeText>  
          <Formik
            initialValues={{deleteConfirm: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.deleteConfirm.toUpperCase() !== "YES") {
                setSubmitting(false);
                showModal('failed', 'Uh oh...', "Didn't typed 'Yes', try again.", 'OK');
              } else {
                handleDeleteAccount(setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <>
                <LargeText
                  textStyle={{marginBottom: 20,color: colors.lightGreen, textAlign: 'center'}}
                >
                  Are you sure you wanna delete your FriendlyBets account?
                </LargeText>
                <RegularText
                  textStyle={{color: colors.lightGreen, textAlign: 'center'}}
                >
                  Type "Yes" and then click the Delete button to confirm.
                </RegularText>
                <StyledTextInput
                  label=""
                  icon="delete-empty"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('deleteConfirm')}
                  onBlur={handleBlur('deleteConfirm')}
                  value={values.deleteConfirm}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.lightGreen}
                  labelStyle={{color: colors.lightGreen}}
                />
                {isSubmitting && <RegularButton
                  style={{marginBottom: 10, backgroundColor: colors.lightGreen}}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.lightGreen}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.lightGreen}}
                >
                  Delete
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

export default DeleteAccount;