export const departmentOptions = {
  sig: 'Sig & Com',
  bat: 'Bâtiments',
  ai: "Agent d'Intervention",
  sur: "Sûreté & Contrôle",
  sc: "Service à la clientèle",
  pcc: "Salle de contrôle",
  adm: "Administration"
}

export const getDepartmentOptions = (color: string): string => {
  switch (color) {
    case 'sig' : {
      return 'Sig & Com'
    }
    case 'bat' : {
      return 'Bâtiments'
    }
    case 'ai' : {
      return "Agent d'Intervention"
    }
    case 'sur' : {
      return 'Sûreté & Contrôle'
    }
    case 'sc' : {
      return 'Service à la clientèle'
    }
    case 'pcc' : {
      return 'Salle de contrôle'
    }
    case 'adm' : {
      return 'Administration'
    }
    default : {
      throw Error("unknown departement");
    }
  }
}