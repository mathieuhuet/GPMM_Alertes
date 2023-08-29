export const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  profileIconColor: '',
  profileIconBackgroundColor: '',
  _id: '',
  accessToken: '',
  role: '',
  department: '',
  reload: 0,
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
    case 'RELOAD': {
      return {
        ...user,
        reload : user.reload + 1
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
        department: action.payload.department,
        admin: action.payload.admin
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}