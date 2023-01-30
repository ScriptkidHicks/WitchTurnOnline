function RotatingSlice(list, start, end) {
  if (end < start) {
    return [...list.slice(start), ...list.slice(0, end)];
  } else {
    return list.slice(start, end);
  }
}

export { RotatingSlice };
