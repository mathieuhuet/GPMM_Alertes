export const departmentOptions = {
  sig: 'Sig & Com',
  bat: 'Bâtiments',
}

export const getDepartmentOptions = (color: string): string => {
  switch (color) {
    case 'sig' : {
      return 'Sig & Com'
    }
    case 'bat' : {
      return 'Bâtiments'
    }
    default : {
      return "error"
    }
  }
}