export function sortDataFromActivities (activityList: any) {
  const result = {
    activityGCT: '',
    activityIDS: '',
    activityPAN: '',
    activityDUQ: '',
    activityRIV: '',
    activityPCC: '',
    activityPCCR: '',
    activityMSF: '',
    numberOfBlue: 0,
    numberOfYellow: 0,
    numberOfRed: 0
  }
  for (let i = 0; i < activityList.length; i++) {
    let level = '';
    if (activityList[i].level === 'mineur') {
      level = '#0063bf';
      result.numberOfBlue += 1;
    } else if (activityList[i].level === 'important') {
      level = '#bcbf00';
      result.numberOfYellow += 1;
    } else if (activityList[i].level === 'urgent') {
      level = '#bf0000';
      result.numberOfRed += 1;
    }
    switch (activityList[i].site) {
      case 'RIV' : {
        result.activityRIV ? result.activityRIV = highestLevel(level, result.activityRIV) : result.activityRIV = level
        break;
      }
      case 'DUQ' : {
        result.activityDUQ ? result.activityDUQ = highestLevel(level, result.activityDUQ) : result.activityDUQ = level
        break;
      }
      case 'PAN' : {
        result.activityPAN ? result.activityPAN = highestLevel(level, result.activityPAN) : result.activityPAN = level
        break;
      }
      case 'IDS' : {
        result.activityIDS ? result.activityIDS = highestLevel(level, result.activityIDS) : result.activityIDS = level
        break;
      }
      case 'GCT' : {
        result.activityGCT ? result.activityGCT = highestLevel(level, result.activityGCT) : result.activityGCT = level
        break;
      }
      case 'PCC' : {
        result.activityPCC ? result.activityPCC = highestLevel(level, result.activityPCC) : result.activityPCC = level
        break;
      }
      case 'PCCR' : {
        result.activityPCCR ? result.activityPCCR = highestLevel(level, result.activityPCCR) : result.activityPCCR = level
        break
      }
      case 'MSF' : {
        console.log(activityList[i]);
        result.activityMSF ? result.activityMSF = highestLevel(level, result.activityMSF) : result.activityMSF = level
        break;
      }
      default : {
        
      }
    }
  }
  return result;
}

function highestLevel (level: string, level2: string) {
  if (level === '#bf0000' || level2 === '#bf0000') {
    return '#bf0000';
  } else if (level === '#bcbf00' || level2 === '#bcbf00') {
    return '#bcbf00';
  } else {
    return '#0063bf';
  }
}