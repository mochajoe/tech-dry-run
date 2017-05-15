var stringifyJSON = function(obj) {

  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return '' + obj;
  }

  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }



  //   take elements and call stringifyJSON on each item and push result of the stringifyJSON to the array
  //   return the array

  // if it is an array (Array.isArray)
  if (Array.isArray(obj)) {
    //   make a variable for the result (result = [])
    var result = [];
    //iterate through the array and call stringifyJSON on each element in the array
    for (var i = 0; i < obj.length; i++) {
      result.push(stringifyJSON(obj[i]));
    }
    //return the formatted results "maybe use join(',')
    if (obj.length < 1) {
      return '[]';
    } else {
      return '[' + result + ']';
    }
  }


  // objects
  // if (is an object)
  //
  // for each property
  //    " + key + " + ':'
  //    stringified component
  //





};
