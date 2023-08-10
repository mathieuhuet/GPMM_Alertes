import React, { FunctionComponent, useState, useContext } from 'react';
import { View, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { postActivity } from '../services/activityServices/postActivity';
import { UserContext } from '../context/user/userContext';

// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import TextInput from '../components/inputs/textInput';
import MessageBox from '../components/texts/messageBox';
import RegularButton from '../components/buttons/regularButton';
import PressableText from '../components/texts/pressableText';
import { colors } from '../components/colors';
import { ScreenHeight } from '../components/shared';
import SmallText from '../components/texts/smallText';
import SelectDateModal from '../components/modals/selectDateModal';
import SelectTimeModal from '../components/modals/selectTimeModal';
import SelectDateButton from '../components/buttons/selestDateButton';
import SelectTimeButton from '../components/buttons/selectTimeButton';
import MessageModal from '../components/modals/messageModal';

const Create: FunctionComponent = ({ navigation }) => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [openDep, setOpenDep] = useState(false);
  const [valueDep, setValueDep] = useState(null);
  const [itemsDep, setItemsDep] = useState([
    {label: 'Sig&Com', value: 'sig'},
    {label: 'Bâtiments', value: 'bat'},
  ]);
  const [openLvl, setOpenLvl] = useState(false);
  const [valueLvl, setValueLvl] = useState(null);
  const [itemsLvl, setItemsLvl] = useState([
    {label: '‼️ Urgent', value: 'urgent'},
    {label: '⚠️ Important', value: 'important'},
    {label: '🛂 Mineur', value: 'mineur'},
    {label: '✅ Routine', value: 'routine'},
  ]);
  const [openEmp, setOpenEmp] = useState(false);
  const [valueEmp, setValueEmp] = useState('');
  const [itemsEmp, setItemsEmp] = useState([

  ]);
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

  const handleNewActivity = async (credentials, setSubmitting) => {
    if (valueLvl === null) {
      setSubmitting(false);
      return setMessage("Remplissez tout les champs,\nChoisissez l'un des niveau d'importance pour l'activité");
    } else if (valueDep === null) {
      setSubmitting(false);
      return setMessage('Remplissez tout les champs,\nChoisissez un département');
    }
    try {
      setMessage('');
      // call backend and move to next page if successful
      const activity = {
        ...credentials,
        creator: user._id,
        dateCreated: new Date(),
        activityDate: date,
        level: valueLvl,
        department: valueDep,
        employee: valueEmp
      }
      const result = await postActivity(activity, user.accessToken)
      setSubmitting(false);
      if (result.data) {
        console.log(result.data);
        return showModal('success', 'Beau travail', result.message, 'OK');
      }
      return showModal('failed', 'Oupsi', result.message, 'OK');
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      return showModal('failed', 'Oupsi', err.message, 'OK');
    }
  }

  return (
    <MainContainer
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      <KeyboardAvoidingContainer>
        <View>
          <RegularText textStyle={{marginBottom: 25}}>
            Créer une tâche
          </RegularText>
          <Formik
            initialValues={{title: "", description: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.title === "" || values.description === '') {
                setMessage('Veuillez remplir tout les champs.');
                setSubmitting(false);
              } else {
                handleNewActivity({title: values.title, description: values.description}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <TextInput
                  label='Titre'
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={{ marginBottom: 15 }}
                  inputFieldStyle={{ height: ScreenHeight / 16 }}
                />
                <TextInput
                  label="Description de l'activité"
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={{ marginBottom: 20 }}
                  inputFieldStyle={{ height: ScreenHeight / 8 }}
                />
                <SmallText>
                  Importance de l'activité?
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={openLvl}
                    value={valueLvl}
                    items={itemsLvl}
                    setOpen={setOpenLvl}
                    setValue={setValueLvl}
                    setItems={setItemsLvl}
                    listMode='MODAL'
                    modalTitle='Choisissez le département concerné.'
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
                <SmallText>
                  Département concerné?
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={openDep}
                    value={valueDep}
                    items={itemsDep}
                    setOpen={setOpenDep}
                    setValue={setValueDep}
                    setItems={setItemsDep}
                    listMode='MODAL'
                    modalTitle='Choisissez le département concerné.'
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
                <SmallText>
                  Quelle journée?
                </SmallText>
                <SelectDateButton
                  onPress={() => setShowDateModal(true)}
                >
                  {date.toLocaleDateString()}
                </SelectDateButton>
                <SelectDateModal
                  buttonHandler={() => setShowDateModal(false)}
                  modalVisible={showDateModal}
                  buttonText='close'
                  date={date}
                  setDate={setDate}
                />
                <SmallText>
                  À quelle heure?
                </SmallText>
                <SelectTimeButton
                  onPress={() => setShowTimeModal(true)}
                >
                  {Platform.OS === 'ios' ? date.toLocaleTimeString().slice(0, -3) : date.toLocaleTimeString().slice(0, -9)}
                </SelectTimeButton>
                <SelectTimeModal
                  buttonHandler={() => setShowTimeModal(false)}
                  modalVisible={showTimeModal}
                  buttonText='close'
                  time={date}
                  setTime={setDate}
                />
                <MessageBox
                  textStyle={{ marginBottom: 20 }}
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
                  Créer
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
              buttonHandler={() => setModalVisible(false)}
            />
        </View>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Create;