export function sortEmployeDepartment (employeList: any, userId: string) {
  const result = [];
  for (let i = 0; i < employeList.length; i++) {
    if (employeList[i]._id === userId) {

    } else {
      result.push({label: employeList[i].firstName + ' ' + employeList[i].lastName, value: employeList[i]._id})
    }
  }
  return result;
}
