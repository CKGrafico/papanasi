// Meanwhile we have Ts types problems on compiling, this is a safe way to get values from an object
export function getObjectValue(object, property) {
  return object && object[property] ? object[property] : null;
}
