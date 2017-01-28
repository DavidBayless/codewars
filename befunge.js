var dirMap = {
  "r": moveRight,
  "l": moveLeft,
  "u": moveUp,
  "d": moveDown
}

var output = "";
var isQuoted = false;
var stack = [];

function interpret(code) {
  var matrixCode = code.split("\n").map(function(elem) { return elem.split("")});
  return interpretChar(matrixCode, [0, 0], "r")
}

function interpretChar(matrix, loc, dir) {
  var char = matrix[loc[1]][loc[0]];
  if (!isQuoted) {
    if (char.match(/[0-9]/)) stack.push(Number(char));
    if (char === ">") dir = "r"
    if (char === "<") dir = "l"
    if (char === "^") dir = "u"
    if (char === "v") dir = "d"
    if (char === "@") {
      var stdOut = output;
      output = "";
      stack = [];
      return stdOut;
    }
    if (char === ".") output += stack.pop();
    if (char === "_") {
      stack.pop() != 0 ? dir = "l" : dir = "r"
    }
    if (char === "|") {
      stack.pop() != 0 ? dir = "u" : dir = "d"
    }
    if (char === ":") {
      stack[stack.length - 1] ? stack.push(stack[stack.length - 1]) : stack.push(0)
    }
    if (char === '"') {
      isQuoted = true;
    }
    if (char === "!") stack.pop() == 0 ? stack.push(1) : stack.push(0)
    if (char === ",") output += String.fromCharCode(stack.pop());
    if (char === "*") {
      var tmpA = stack.pop()
      var tmpB = stack.pop()
      stack.push(tmpA * tmpB)
    }
    if (char === "+") stack.push(Number(stack.pop()) + Number(stack.pop()))
    if (char === "-") {
      var tmpA = stack.pop()
      var tmpB = stack.pop()
      stack.push(tmpB - tmpA)
    }
    if (char === "/") {
      var tmpA = stack.pop()
      var tmpB = stack.pop()
      var pushable = tmpB / tmpA || 0;
      stack.push(pushable)
    }
    if (char === "%") {
      var tmpA = stack.pop()
      var tmpB = stack.pop()
      var pushable = tmpB % tmpA || 0;
      stack.push(pushable)
    }
    if (char === "`") {
      var tmpA = stack.pop()
      var tmpB = stack.pop()
      var pushable = tmpB > tmpA ? 1 : 0;
      stack.push(pushable)
    }
    if (char === "$") stack.pop()
    if (char === "#") loc = dirMap[dir](loc, matrix)
    if (char === "p") {
      var tmpY = stack.pop()
      var tmpX = stack.pop()
      var tmpV = stack.pop()
      matrix[tmpY][tmpX] = String.fromCharCode(tmpV);
    }
    if (char === "g") {
      var tmpY = stack.pop()
      var tmpX = stack.pop()
      stack.push(matrix[tmpY][tmpX].charCodeAt());
    }
    if (char.match(/\\/)) {
      var tmpY = stack.pop() || 0
      var tmpX = stack.pop() || 0
      stack.push(tmpY, tmpX)
    }
    if (char === "?") dir = randomDir()
  } else {
    char === '"' ? isQuoted = false : stack.push(char.charCodeAt(0))
  }
  return interpretChar(matrix, dirMap[dir](loc, matrix), dir)
}


function moveUp(loc, matrix) {
  return loc[1] - 1 >= 0 ? [loc[0], loc[1] - 1] : [loc[0], matrix.length - 1]
}

function moveRight(loc, matrix) {
  return loc[0] + 1 < matrix[loc[1]].length ? [loc[0] + 1, loc[1]] : [0, loc[1]]
}

function moveDown(loc, matrix) {
  return loc[1] + 1 < matrix.length ? [loc[0], loc[1] + 1] : [loc[0], 0]
}

function moveLeft(loc, matrix) {
  return loc[0] - 1 >= 0 ? [loc[0] - 1, loc[1]] : [matrix[loc[1]].length - 1, loc[1]]
}

function randomDir() {
  var num = Math.floor(Math.random() * 4);
  if (num === 0) return "d"
  if (num === 1) return "u"
  if (num === 2) return "l"
  if (num === 3) return "r"
}
console.log(interpret('2>:3g" "-!v\\  g30          <\n |!`"O":+1_:.:03p>03g+:"O"`|\n @               ^  p3\\" ":<\n2 234567890123456789012345678901234567890123456789012345678901234567890123456789'))

// '>25*"!dlroW olleH":v_,:v>  ^_,:v>'
console.log("\u0002".charCodeAt());
console.log(String.fromCharCode(27));
