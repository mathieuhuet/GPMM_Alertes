import React, { FunctionComponent, useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { loginEmail } from '../services/userServices/login';
import { verifyUser } from '../services/userServices/verifyLoginCode';
import { getUserInfo } from '../services/userServices/getUserInfo';
// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import ResendEmailTimer from '../components/timers/resendEmailTimer';
import RegularButton from '../components/buttons/regularButton';
import IconHeader from '../components/icons/iconHeader';
import StyledCodeInput from '../components/inputs/styledCodeInput';
import MessageModal from '../components/modals/messageModal';
import { colors } from '../components/colors';
import { UserDispatchContext } from '../context/user/userContext';


async function saveAccessToken(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
  return value;
}

const getAccessToken: () => Promise<string> = async () => {
  let result = await SecureStore.getItemAsync('accessToken');
  if (result) {
    return result;
  } else {
    return '';
  }
}


const EmailVerification: FunctionComponent = ({ navigation, route }) => {
  const dispatch = useContext(UserDispatchContext);


  const email = route.params.email;
  const MAX_CONST_LENGTH = 4;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Resending email
  const [activeResend, setActiveResend] = useState(true);

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
      await getAccessToken().then(data => {
        dispatch({ type: 'SET_ACCESSTOKEN', payload: {accessToken: data}});
      }).catch(err => {
        console.log(err, 'APP 1');
      });
    }
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleEmailVerification = () => {
    setVerifying(true);
    // call backend
    verifyUser({loginCode: code, email: email}).then(result => {
      setVerifying(false);
      if (result.data) {
        saveAccessToken(result.data.accessToken).then((accessToken) => {
          if (accessToken) {
            getUserInfo(accessToken).then((result) => {
              dispatch({ type: 'SET_CREDENTIALS', 
              payload: {
                firstName: result.data.firstName, 
                lastName: result.data.lastName,
                email: result.data.email,
                profileIconColor: result.data.profileIconColor, 
                profileIconBackgroundColor: result.data.profileIconBackgroundColor, 
                profileIconPolice: result.data.profileIconPolice,
                _id: result.data._id
              }});
            }).catch((err) => {
              console.log(err, 'EMAIL 2');
            })
          }
        }).catch(err => {
          console.log(err);
        })
        return showModal('success', 'All Good!', 'Your email has been verified.', 'Proceed');
      }
    }).catch(err => {
      setVerifying(false);
      return showModal('failed', 'Uh oh...', err.message, 'OK');
    });
  }


  const resendEmail = () => {
    loginEmail({email: email}).then(result => {
      if (result.data) {
        const email = result.data;
        navigation.navigate('EmailVerification', email);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader 
          name="lock"
        />
        <RegularText textStyle={{marginTop: 20, textAlign: 'center'}}>An email with a 4-digit code was sent to :</RegularText>
        <RegularText textStyle={{marginBottom: 25, marginTop: 2, textAlign: 'center', fontWeight: 'bold'}}>{email}</RegularText>

        <StyledCodeInput 
          maxLength={MAX_CONST_LENGTH}
          code={code}
          setCode={setCode}
          setPinReady={setPinReady}
        />

        {verifying && <RegularButton>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
        </RegularButton>}
        {!verifying && pinReady && <RegularButton
          onPress={handleEmailVerification}
        >
          Verify
        </RegularButton>}
        {!verifying && !pinReady && <RegularButton
          disabled={true} 
          style={{backgroundColor: colors.secondary}}
          textStyle={{color: colors.lightGray}}
        >
          Verify
        </RegularButton>}
        <ResendEmailTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          targetTime={30000}
          resendEmail={resendEmail}
        />
        <MessageModal
          headerText={modalHeaderText}
          message={modalMessage}
          modalVisible={modalVisible}
          type={modalMessageType}
          buttonText={modalButtonText}
          buttonHandler={modalButtonHandler}
        />
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default EmailVerification;