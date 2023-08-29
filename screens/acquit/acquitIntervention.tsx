import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserContext } from '../../context/user/userContext';
import { postInterventionAcquit } from '../../services/activityServices/postInterventionAcquit';
import { fetchUsersByDepartment } from '../../services/userServices/fetchUsersByDepartment';
import { sortEmployeDepartment } from '../../utils/sortEmployeDepartment';

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
import SmallText from '../../components/texts/smallText';

const AcquitIntervention: FunctionComponent = ({ navigation, route }: any) => {
  const user = useContext(UserContext);
  const activity = route.params;
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');
  const [employe, setEmploye] = useState([]);
  const [openEmp, setOpenEmp] = useState(false);
  const [valueEmp, setValueEmp] = useState([]);
  const [itemsEmp, setItemsEmp] = useState([
  ]);

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
        personne: valueEmp,
        activityCreator: activity.creator,
      }
      const result = await postInterventionAcquit(acquit, user.accessToken) as any;
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

  useEffect(() => {
    const getEmploye = async () => {
      if (activity.department) {
        try {
          const result = await fetchUsersByDepartment({department: activity.department}, user.accessToken) as any;
          setEmploye(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getEmploye();
  }, [activity.department])

  useEffect(() => {
    if (employe) {
      setItemsEmp(sortEmployeDepartment(employe, user._id));
    }
  }, [employe])

  return (
    <MainContainer
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      <KeyboardAvoidingContainer
        scrollStyle={{paddingBottom: 200}}
      >
        <View>
          <RegularText textStyle={{marginBottom: 25, fontWeight: 'bold'}}>
            Acquitter l'activité d'intervention
          </RegularText>
          <Formik
            initialValues={{ equipment: "", description: "", result: "", observation: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if ( values.equipment === '' || values.description === "" || values.result === "") {
                setMessage('Veuillez remplir tout les champs.');
                setSubmitting(false);
              } else {
                handleNewAcquit({equipment: values.equipment, description: values.description, result: values.result, observation: values.observation}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <SmallText>
                  D'autre employé de votre équipe était avec vous? (optionel)
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    multiple={true}
                    min={0}
                    max={6}
                    placeholder=''
                    open={openEmp}
                    value={valueEmp}
                    items={itemsEmp}
                    setOpen={setOpenEmp}
                    setValue={setValueEmp}
                    setItems={setItemsEmp}
                    listMode='MODAL'
                    modalTitle="Choisissez l'employé concerné."
                    modalContentContainerStyle={{ backgroundColor: colors.whiteGreen }}
                    modalAnimationType='slide'
                    style={{
                      backgroundColor: colors.white,
                      borderColor: colors.lightGreen,
                      borderWidth: 2
                    }}
                    textStyle={{
                      color: colors.darkGreen,
                      fontSize: 18
                    }}
                  />
                </View>
                <TextInput
                  label="Équipement"
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('equipment')}
                  onBlur={handleBlur('equipment')}
                  value={values.equipment}
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 10 }}
                />
                <TextInput
                  label="Description"
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 10 }}
                />
                <TextInput
                  label="Résultat"
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('result')}
                  onBlur={handleBlur('result')}
                  value={values.result}
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 10 }}
                />
                <TextInput
                  label="Observation"
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('observation')}
                  onBlur={handleBlur('observation')}
                  value={values.description}
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 10 }}
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

export default AcquitIntervention;