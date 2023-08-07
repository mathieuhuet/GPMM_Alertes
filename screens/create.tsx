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



const Create: FunctionComponent = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Sig&Com', value: 'sig'},
    {label: 'Bâtiments', value: 'bat'},
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
                
                <RegularText>
                  Quel département?
                </RegularText>
                <View
                  style={{zIndex: 10}}
                >
                  <DropDownPicker
                    placeholder=''
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    maxHeight={400}
                    dropDownContainerStyle={{
                      backgroundColor: colors.white,
                      borderColor: colors.darkGreen
                    }}
                    style={{
                      backgroundColor: colors.white,
                      borderColor: colors.lightGreen
                    }}
                    textStyle={{
                      color: colors.darkGreen,
                      fontSize: 18
                    }}
                    listParentLabelStyle={{
                      fontWeight: "bold"
                    }}
                    listChildContainerStyle={{
                      paddingLeft: 20
                    }}
                    listItemContainerStyle={{
                      height: 40
                    }}
                    theme="DARK"
                    multiple={false}
                    mode="BADGE"
                    itemSeparator={true}
                  />
                </View>
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