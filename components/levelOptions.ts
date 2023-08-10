export const levelOptions = {
  urgent: '‼️ Urgent',
  important: '⚠️ Important',
  mineur: '🛂 Mineur',
  routine: '✅ Routine',
}

export const getLevelOptions = (color: string): string => {
  switch (color) {
    case 'urgent' : {
      return '‼️ Urgent'
    }
    case 'important' : {
      return '⚠️ Important'
    }
    case 'mineur' : {
      return '🛂 Mineur'
    }
    case 'routine' : {
      return '✅ Routine'
    }
    default : {
      return "error"
    }
  }
}