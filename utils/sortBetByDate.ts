export function sortBetByDate (betList) {
  return betList.sort((a, b) => {
    return (a.bettingEndAt < b.bettingEndAt) ? -1 : (a.bettingEndAt < b.bettingEndAt) ? 1 : 0;
  })
}