export const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  profileIconColor: '',
  profileIconBackgroundColor: '',
  accessToken: ''
}


export const userReducer = (user, action) => {
  switch (action.type) {
    case 'SET_ACCESSTOKEN': {
      return {
        ...user,
        accessToken: action.payload.accessToken
      }
    }
    case 'SET_NAME': {
      return {
        ...user,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    }
    case 'SET_PROFILEICON': {
      return {
        ...user,
        profileIconColor: action.payload.profileIconColor,
        profileIconBackgroundColor: action.payload.profileIconBackgroundColor
      }
    }
    case 'SET_EMAIL': {
      return {
        ...user,
        email: action.payload.email
      }
    }
    case 'SET_CREDENTIALS': {
      return {
        ...user,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profileIconColor: action.payload.profileIconColor,
        profileIconBackgroundColor: action.payload.profileIconBackgroundColor,
        email: action.payload.email,
        _id: action.payload._id
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}