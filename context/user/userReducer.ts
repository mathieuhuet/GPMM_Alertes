export const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  profileIconColor: '',
  profileIconBackgroundColor: '',
  _id: '',
  accessToken: '',
  role: '',
  departement: '',
  admin: false
}


export const userReducer = (user: any, action: any) => {
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
        _id: action.payload._id,
        role: action.payload.role,
        departement: action.payload.departement,
        admin: action.payload.admin
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}