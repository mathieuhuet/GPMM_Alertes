export const profileColors = {
  darkBlue: "#2c365a",
  lightBlue: "#85c6d8",
  gray: "#969bad",
  sand: "#fde6bb",
  yellow: "#fbcd77",
  lightGreen: "#9ed885",
  purple: "#a377fb",
  orange: "#ef835d",
  white: '#ffffff'
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
      return "#9ed885"
    }
    case 'purple' : {
      return "#a377fb"
    }
    case 'orange' : {
      return "#ef835d"
    }
    case 'white' : {
      return "#ffffff"
    }
    default : {
      return "#fde6bb"
    }
  }
}