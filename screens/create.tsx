import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';

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



const Create: FunctionComponent = ({ navigation }) => {
  const [message, setMessage] = useState('');
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

  const handleCreate = (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful

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
            initialValues={{title: "", detail: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.title === "") {
                setMessage('Veuillez entrer un titre.');
                setSubmitting(false);
              } else {
                handleCreate({email: values.title.toLowerCase()}, setSubmitting);
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
                  label='Détails'
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('detail')}
                  onBlur={handleBlur('detail')}
                  value={values.detail}
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
                <RegularButton
                  onPress={() => setShowDateModal(true)}
                >
                  show DATE modal
                </RegularButton>
                <SelectDateModal
                  buttonHandler={() => setShowDateModal(false)}
                  headerText='test'
                  modalVisible={showDateModal}
                  buttonText='close'
                />
                <RegularButton
                  onPress={() => setShowTimeModal(true)}
                >
                  show TIME modal
                </RegularButton>
                <SelectTimeModal
                  buttonHandler={() => setShowTimeModal(false)}
                  headerText='test'
                  modalVisible={showTimeModal}
                  buttonText='close'
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
                  Créer
                </RegularButton>}
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Create;