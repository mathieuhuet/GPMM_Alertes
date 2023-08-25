export const levelOptions = {
  urgent: '🚨 Urgent',
  important: '⚠️ Important',
  mineur: '🛂 Mineur',
}

export const getLevelOptions = (color: string): string => {
  switch (color) {
    case 'urgent' : {
      return '🚨 Urgent'
    }
    case 'important' : {
      return '⚠️ Important'
    }
    case 'mineur' : {
      return '🛂 Mineur'
    }
    default : {
      throw Error("unknown level of activity");
    }
  }
}