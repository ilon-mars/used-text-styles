export const getLineHeight = (lhObj: LineHeight): string => {
  if (lhObj.unit === 'AUTO') {
    return 'auto';
  } else if (lhObj.unit === 'PERCENT') {
    return `${Math.floor(lhObj.value)}%`;
  } else {
    return `${Math.floor(lhObj.value)}px`;
  }
};
