import Cookie from "js-cookie";

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

async function checkLoginState(
  successCallback,
  failureCallback,
  noCookieCallback,
  serverErrorCallback,
  setLoginStatus
) {
  let loginCookie = Cookie.get("witchTurnUserLogin");

  if (!loginCookie) {
    noCookieCallback();
    return false;
  }

  const validationRequest = {
    method: "GET",
    headers: {
      Accept: "application/JSON",
      "content-type": "application/JSON",
      origin: `${process.env.REACT_APP_QUERY_SOURCE}`,
      authorization: `Bearer ${loginCookie}`,
    },
  };

  fetch("http://localhost:3002/subscribers/Verify", validationRequest).then(
    (response) => {
      if (response.status >= 500) {
        alert(
          "There is currently something wonky with the server. Sorry friend. Try again later."
        );
        serverErrorCallback();
      } else if (response.status === 401) {
        Cookie.remove("witchTurnUserLogin");
        setLoginStatus(false);
        failureCallback();
        return false;
      } else if (response.status === 200) {
        setLoginStatus(true);
        successCallback();
        return true;
      }
    }
  );
}

export {
  RotatingSlice,
  Debounce,
  AbstractDualQualitySorter,
  SortObjectsByName,
  validateString,
  emailvalidate,
  checkLoginState,
};
