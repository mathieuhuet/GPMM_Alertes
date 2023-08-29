import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import { postActivity } from '../services/activityServices/postActivity';
import { UserContext, UserDispatchContext } from '../context/user/userContext';
import { fetchUsersByDepartment } from '../services/userServices/fetchUsersByDepartment';
import { sortEmployeDepartment } from '../utils/sortEmployeDepartment';

// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import TextInput from '../components/inputs/textInput';
import MessageBox from '../components/texts/messageBox';
import RegularButton from '../components/buttons/regularButton';
import { colors } from '../components/colors';
import { ScreenHeight } from '../components/shared';
import SmallText from '../components/texts/smallText';
import SelectDateModal from '../components/modals/selectDateModal';
import SelectTimeModal from '../components/modals/selectTimeModal';
import SelectDateButton from '../components/buttons/selestDateButton';
import SelectTimeButton from '../components/buttons/selectTimeButton';
import MessageModal from '../components/modals/messageModal';

const Create: FunctionComponent = ({ navigation }: any) => {
  const user = useContext(UserContext);  
  const dispatch = useContext(UserDispatchContext);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [openDep, setOpenDep] = useState(false);
  const [valueDep, setValueDep] = useState(null);
  const [itemsDep, setItemsDep] = useState([
    {label: 'Sig&Com', value: 'sig'},
    {label: 'Bâtiments', value: 'bat'},
    {label: "Agent d'Intervention", value: 'ai'},
    {label: 'Service à la clientèle', value: 'sc'},
    {label: 'Sûreté & Contrôle', value: 'sur'},
    {label: 'Salle de contrôle', value: 'pcc'},
    {label: 'Administration', value: 'adm'},
  ]);
  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [itemsType, setItemsType] = useState([
    {label: '✅ Routine', value: 'routine'},
    {label: '🚧 Intervention', value: 'intervention'},
    {label: '👨‍🔧 Général (autres)', value: 'general'},
  ]);
  const [openLvl, setOpenLvl] = useState(false);
  const [valueLvl, setValueLvl] = useState(null);
  const [itemsLvl, setItemsLvl] = useState([
    {label: '🚨 Urgent', value: 'urgent'},
    {label: '⚠️ Important', value: 'important'},
    {label: '🛂 Mineur', value: 'mineur'},
  ]);
  const [openEmp, setOpenEmp] = useState(false);
  const [valueEmp, setValueEmp] = useState([]);
  const [itemsEmp, setItemsEmp] = useState([
  ]);
  const [openSite, setOpenSite] = useState(false);
  const [valueSite, setValueSite] = useState(null);
  const [itemsSite, setItemsSite] = useState([
    {label: 'PCC (Poste de Commande Centralisé)', value: 'PCC'},
    {label: 'PCCR (Poste de Commande Centralisé de Relève)', value: 'PCCR'},
    {label: 'MSF (Atelier de Maintenance)', value: 'MSF'},
    {label: 'RIV (Brossard)', value: 'RIV'},
    {label: 'DUQ (Du Quartier)', value: 'DUQ'},
    {label: 'PAN (Panama)', value: 'PAN'},
    {label: 'IDS (Île-des-Soeurs)', value: 'IDS'},
    {label: 'GCT (Gare Centrale)', value: 'GCT'},
  ]);
  const [openSys, setOpenSys] = useState(false);
  const [valueSys, setValueSys] = useState(null);
  const [itemsSys, setItemsSys] = useState([
    {label: 'Billettique', value: 'Billettique'},
    {label: 'DAT', value: 'DAT', parent: 'Billettique'},
    {label: 'Portillons', value: 'Portillons', parent: 'Billettique'},
    {label: 'Portes pallières', value: 'Porte pallières'},
    {label: 'PSDCU', value: 'PSDCU', parent: 'Porte pallières'},
    {label: 'ATS', value: 'ATS'},
    {label: 'CCTV', value: 'CCTV'},
    {label: 'Archiveur', value: 'Archiveur', parent: 'CCTV'},
    {label: 'Genetec', value: 'Genetec', parent: 'CCTV'},
    {label: 'Annonce Passager', value: 'Annonce Passager'},
    {label: 'Haut-Parleurs', value: 'Haut-Parleurs', parent: 'Annonce Passager'},
    {label: 'Moniteurs', value: 'Moniteurs', parent: 'Annonce Passager'},
    {label: 'Autres', value: 'Autres'},
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');
  const [employe, setEmploye] = useState([]);

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);

  }

  const handleNewActivity = async (credentials: any, setSubmitting: any) => {
    if (valueLvl === null) {
      setSubmitting(false);
      return setMessage("Remplissez tout les champs,\nChoisissez l'un des niveau d'importance pour l'activité");
    } else if (valueDep === null) {
      setSubmitting(false);
      return setMessage("Remplissez tout les champs,\nChoisissez un département concerné pour l'activité");
    } else if (valueSys === null) {
      setSubmitting(false);
      return setMessage("Remplissez tout les champs,\nChoisissez un système concerné pour l'activité");
    } else if (valueSite === null) {
      setSubmitting(false);
      return setMessage("Remplissez tout les champs,\nChoisissez un site concerné pour l'activité");
    }
    try {
      setMessage('');
      // call backend and move to next page if successful
      const activity = {
        ...credentials,
        creator: user._id,
        dateCreated: new Date(),
        activityDate: date,
        type: valueType,
        level: valueLvl,
        department: valueDep,
        employee: valueEmp,
        site: valueSite,
        system: valueSys,
      }
      const result = await postActivity(activity, user.accessToken) as any;
      setSubmitting(false);
      if (result.data) {
        console.log(result.data);    
        dispatch({type: 'RELOAD'});
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
      if (valueDep) {
        try {
          const result = await fetchUsersByDepartment({department: valueDep}, user.accessToken) as any;
          setEmploye(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getEmploye();
  }, [valueDep])

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
                  style={{ marginBottom: ScreenHeight * 0.01 }}
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
                  style={{ marginBottom: ScreenHeight * 0.01 }}
                  inputFieldStyle={{ height: ScreenHeight / 8 }}
                />
                <SmallText>
                  Type d'activité
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={openType}
                    value={valueType}
                    items={itemsType}
                    setOpen={setOpenType}
                    setValue={setValueType}
                    setItems={setItemsType}
                    listMode='MODAL'
                    modalTitle="Choisissez le type d'activité."
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
                  Importance de l'activité
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
                    modalTitle="Choisissez le niveau d'importance de l'activité."
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
                  Emplacement
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={openSite}
                    value={valueSite}
                    items={itemsSite}
                    setOpen={setOpenSite}
                    setValue={setValueSite}
                    setItems={setItemsSite}
                    listMode='MODAL'
                    modalTitle="Choisissez l'emplacement concerné."
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
                  Système concerné
                </SmallText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={openSys}
                    value={valueSys}
                    items={itemsSys}
                    setOpen={setOpenSys}
                    setValue={setValueSys}
                    setItems={setItemsSys}
                    listMode='MODAL'
                    modalTitle='Choisissez le système concerné.'
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
                  Département concerné
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
                {valueDep &&
                <>
                  <SmallText>
                    Employé Concerné (Optionel)
                  </SmallText>
                  <View
                    style={{zIndex: 10}}
                  >
                    <DropDownPicker
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
                </>
                }
                <SmallText>
                  Quelle journée
                </SmallText>
                <SelectDateButton
                  onPress={() => setShowDateModal(true)}
                >
                  {date.toLocaleDateString()}
                </SelectDateButton>
                <SelectDateModal
                  buttonHandler={() => setShowDateModal(false)}
                  modalVisible={showDateModal}
                  buttonText='Sélectionner'
                  date={date}
                  setDate={setDate}
                />
                <SmallText>
                  À quelle heure
                </SmallText>
                <SelectTimeButton
                  onPress={() => setShowTimeModal(true)}
                >
                  {Platform.OS === 'ios' ? date.toLocaleTimeString().slice(0, -3) : date.toLocaleTimeString().slice(0, -9)}
                </SelectTimeButton>
                <SelectTimeModal
                  buttonHandler={() => setShowTimeModal(false)}
                  modalVisible={showTimeModal}
                  buttonText='Sélectionner'
                  time={date}
                  setTime={setDate}
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
              buttonHandler={() => navigation.navigate('Dashboard')}
            />
        </View>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Create;