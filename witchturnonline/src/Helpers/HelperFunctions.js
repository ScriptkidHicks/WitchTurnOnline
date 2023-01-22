function RotatingSlice(list, start, end) {
  console.log("slicing");

  console.log("end " + end + " start " + start);
  if (end < start) {
    console.log("end < start ");
    console.log([...list.slice(start), ...list.slice(0, end)]);
    return [...list.slice(start), ...list.slice(0, end)];
  } else {
    console.log(list.slice(start, end));
    return list.slice(start, end);
  }
}

export { RotatingSlice };
