function getCommands(field, power) {
  // insert awesome code here
  var matrix = setMatrix(field);
}

function setMatrix(str) {
  var matrixLength = divisionSize(str);
  console.log(matrixLength);
  var matrix = [];
  for (var i = 0; i < matrixLength; i++) {
    var slice = str.slice(0, -str.length + matrixLength) || str;
    console.log(slice);
    str = str.slice(matrixLength);
    matrix.push(slice);
  }
  return matrix;
}

function divisionSize(str) {
  return Math.sqrt(str.length);
}
