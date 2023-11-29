function hashCode(str) {
  // Simple hash function for creating a unique index
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateLabelColorObj(label_string) {
  // Arrays of predefined text and background color pairs
  const textColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
  const backgroundColor = ['#0d3472', '#3d188e', '#711a36', '#8a1c0a', '#7a2e0b', '#7a4706', '#594c05', '#684e07', '#0b4f30', '#04502e', '#b6cff5', '#98d7e4', '#e3d7ff', '#fbd3e0', '#f2b2a8', '#ffc8af', '#ffdeb5', '#fbe983', '#fdedc1', '#b3efd3'];

  // Generate an index based on the label string
  const index = hashCode(label_string) % 20; // Modulo 20 to limit index within the range of predefined colors

  // Assign colors from predefined pairs based on the generated index
  var color = {
    'textColor': textColor[index],
    'backgroundColor': backgroundColor[index],
  };

  return color;
}

// Example usage
// console.log(generateLabelColorObj("Example Label"));
