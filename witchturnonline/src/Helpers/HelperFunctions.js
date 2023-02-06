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

export {
  RotatingSlice,
  Debounce,
  AbstractDualQualitySorter,
  SortObjectsByName,
};
