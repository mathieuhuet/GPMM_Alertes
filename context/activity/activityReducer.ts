export const initialActivity = [];

export const activityReducer = (activities: any, action: any) => {
  switch (action.type) {
    case 'ADD_ACTIVITY': {
      return [
        ...activities, 
        action.activity
      ]
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};