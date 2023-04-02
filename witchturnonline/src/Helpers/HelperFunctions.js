function RotatingSlice(list, start, end) {
  if (end < start) {
    return [...list.slice(start), ...list.slice(0, end)];
  } else {
    return list.slice(start, end);
  }
}

function Debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function AbstractDualQualitySorter(
  toBeSorted,
  primaryQuality,
  secondaryQuality
) {
  toBeSorted.sort((a, b) => {
    return a[primaryQuality] == b[primaryQuality]
      ? b[secondaryQuality] - a[secondaryQuality]
      : b[primaryQuality] - a[primaryQuality];
  });
  return toBeSorted;
}

function SortObjectsByName(toBeSorted) {
  toBeSorted.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return toBeSorted;
}

function validateString(
  examinedString,
  minLength,
  maxLength,
  disallowedSubstrings,
  needsNumeric,
  needsSymbol
) {
  let validationResponse = "";

  if (minLength != 0 && examinedString.length < minLength) {
    validationResponse += "- Not long enough\n";
  }

  if (maxLength && examinedString.length > maxLength) {
    validationResponse += "- Too long\n";
  }

  if (disallowedSubstrings != []) {
    disallowedSubstrings.forEach((substring) => {
      if (examinedString.includes(substring)) {
        if (substring === " ") {
          validationResponse += "- Contains a space\n";
        } else {
          validationResponse += `- Contains ${substring}\n`;
        }
      }
    });
  }

  if (needsNumeric && !/\d/.test(examinedString)) {
    validationResponse += "- Does not contain a number\n";
  }

  if (needsSymbol && /^[a-zA-Z0-9]+$/.test(examinedString)) {
    validationResponse += "- Does not contain a non-alphanumberic symbol\n";
  }

  return validationResponse;
}

function emailvalidate(emailString) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    emailString
  );
}

export {
  RotatingSlice,
  Debounce,
  AbstractDualQualitySorter,
  SortObjectsByName,
  validateString,
  emailvalidate,
};
