var originalArray, nextIndex;

function Array2Iterator(array){
  if(!array || !Array.isArray(array)){
    throw new TypeError("Array2Iterator needs an array argument!");
  }

  nextIndex = 0;
  originalArray = array;

  return{
    next: nextElement,
    reset: resetIndex,
    hasNext: hasNextValue
  }
}

function nextElement(){
    return hasNextValue() ? originalArray[nextIndex++] : null;
}

function resetIndex(){
  nextIndex = 0;
}

function hasNextValue(){
  return nextIndex < originalArray.length;
}

module.exports = Array2Iterator;
