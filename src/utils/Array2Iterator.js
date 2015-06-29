var originalArray, nextIndex;

function Array2Iterator(array){
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
