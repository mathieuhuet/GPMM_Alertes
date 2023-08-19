export const typeOptions = {
  routine: '✅ Routine',
  general: '👨‍🔧 Général (autres)',
  intervention: '🚧 Intervention',
}

export const getTypeOptions = (color: string): string => {
  switch (color) {
    case 'routine' : {
      return '✅ Routine'
    }
    case 'general' : {
      return '👨‍🔧 Général (autres)'
    }
    case 'intervention' : {
      return '🚧 Intervention'
    }
    default : {
      return "error"
    }
  }
}