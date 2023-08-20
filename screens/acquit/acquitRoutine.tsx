import React, { FunctionComponent, useState, useContext } from 'react';
import { View, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserContext } from '../../context/user/userContext';
import { postRoutineAcquit } from '../../services/activityServices/postRoutineAcquit';

// Custom components
import MainContainer from '../../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';
import TextInput from '../../components/inputs/textInput';
import MessageBox from '../../components/texts/messageBox';
import RegularButton from '../../components/buttons/regularButton';
import { colors } from '../../components/colors';
import { ScreenHeight } from '../../components/shared';
import MessageModal from '../../components/modals/messageModal';

const AcquitRoutine: FunctionComponent = ({ navigation, route }: any) => {
  const user = useContext(UserContext);
  const activity = route.params;
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);

  }

  const handleNewAcquit = async (credentials: any, setSubmitting: any) => {
    try {
      setMessage('');
      // call backend and move to next page if successful
      const acquit = {
        ...credentials,
        creator: user._id,
        activityId: activity._id,
        dateCreated: new Date(),
      }
      const result = await postRoutineAcquit(acquit, user.accessToken) as any;
      setSubmitting(false);
      if (result.data) {
        console.log(result.data);
        return showModal('success', 'Beau travail', result.message, 'OK');
      }
      return showModal('failed', 'Oupsi', result.message, 'OK');
    } catch (err: any) {
      console.log(err);
      setSubmitting(false);
      return showModal('failed', 'Oupsi', err.message, 'OK');
    }
  }

  return (
    <MainContainer
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      <KeyboardAvoidingContainer
        scrollStyle={{paddingBottom: 200}}
      >
        <View>
          <RegularText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
          Acquitter l'activité de routine
          </RegularText>
          <Formik
            initialValues={{comments: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.comments === "") {
                setMessage('Veuillez remplir tout les champs.');
                setSubmitting(false);
              } else {
                handleNewAcquit({comments: values.comments}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <TextInput
                  label='Commentaires'
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('comments')}
                  onBlur={handleBlur('comments')}
                  value={values.comments}
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 16 }}
                />
                <MessageBox
                  textStyle={{ marginBottom: ScreenHeight * 0.01 }}
                >
                  { message || ' ' }
                </MessageBox>
                {isSubmitting && <RegularButton
                  style={{elevation: 0}}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.darkGreen}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                  style={{elevation: 0}}
                >
                  Envoyer
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
              buttonHandler={() => navigation.navigate('Dashboard')}
            />
        </View>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default AcquitRoutine;