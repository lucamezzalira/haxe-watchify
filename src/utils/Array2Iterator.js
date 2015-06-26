var originalArray, nextIndex;

function Array2Iterator(array){
  nextIndex = 0;
  originalArray = array;

  return{
    next: nextElement,
    reset: resetIndex
  }
}

function nextElement(){
    return nextIndex < originalArray.length ? originalArray[nextIndex++] : null;
}

function resetIndex(){
  nextIndex = 0;
}

module.exports = Array2Iterator;
