export const profileColors = {
  darkBlue: "#2c365a",
  lightBlue: "#85c6d8",
  gray: "#969bad",
  sand: "#fde6bb",
  yellow: "#fbcd77",
  lightGreen: "#82bf00",
  darkGreen: "#004638",
  neonGreen: '#d8f537',
  purple: "#a377fb",
  orange: "#ef835d",
  white: '#f6f6f6'
}

export const getProfileColorCode = (color: string): string => {
  switch (color) {
    case 'lightBlue' : {
      return "#85c6d8"
    }
    case 'darkBlue' : {
      return "#2c365a"
    }
    case 'gray' : {
      return "#969bad"
    }
    case 'sand' : {
      return "#fde6bb"
    }
    case 'yellow' : {
      return "#fbcd77"
    }
    case 'lightGreen' : {
      return "#82bf00"
    }
    case 'darkGreen' : {
      return "#004638"
    }
    case 'neonGreen' : {
      return "#d8f537"
    }
    case 'purple' : {
      return "#a377fb"
    }
    case 'orange' : {
      return "#ef835d"
    }
    case 'white' : {
      return "#f6f6f6"
    }
    default : {
      return "#fde6bb"
    }
  }
}