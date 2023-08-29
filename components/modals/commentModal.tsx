import React, { FunctionComponent, useState } from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import { postComments } from '../../services/activityServices/postComments';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';
import TextInput from '../inputs/textInput';
import { ScreenHeight } from '../shared';



const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  padding-top: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-start;
  align-items: center;
`;

const ModalView = styled.View`
  background-color: ${colors.whiteGreen};
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

interface Props {
  closeModal: any;
  modalVisible: boolean;
  activityId: any;
  userId: any;
  userAccessToken: any;
}

const CommentModal: FunctionComponent<Props> = (props) => {
  const [message, setMessage] = useState('Envoyer un commentaire?');

  const handleNewActivity = async (credentials: any, setSubmitting: any) => {
    try {
      // call backend and move to next page if successful
      const comments = {
        ...credentials,
        activityId: props.activityId,
        creator: props.userId,
        dateCreated: new Date(),
        reported: false,
      }
      setSubmitting(false);
      const result = await postComments(comments, props.userAccessToken) as any;
      if (result.data) {
        console.log(result.data);
        return props.closeModal();
      }
      return setMessage("Incapable d'envoyer le commentaire.");
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      return setMessage("Incapable d'envoyer le commentaire.");
    }
  }

  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer
        onPress={props.closeModal}
      >
        <ModalView>
          <RegularText
            textStyle={{fontWeight: 'bold', fontSize: ScreenHeight * 0.04}}
          >
            {message}
          </RegularText>
          <Formik
            initialValues={{comment: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.comment === "") {
                setSubmitting(false);
              } else {
                handleNewActivity({comments: values.comment}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <>
                <TextInput
                  keyboardType="default"
                  multiline={true}
                  placeholder=""
                  onChangeText={handleChange('comment')}
                  onBlur={handleBlur('comment')}
                  value={values.comment}
                  style={{ marginBottom: 15 }}
                  inputFieldStyle={{height: ScreenHeight * 0.16}}
                />
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
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}


export default CommentModal;
