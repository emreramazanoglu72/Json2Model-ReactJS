function PasscalCase(string) {
  return string.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
}

const Types = [
  { string: "string" },
  { number: "int" },
  { boolean: "bool" },
  { object: "object" },
];
var childs = [];

const CSharpConverter = (text, setCode, settings) => {
  childs = [];
  let json = JSON.parse(text);
  if(Array.isArray(json)){
    json = json[0];
  }
  const list = Object.keys(json);
  var newText = `public class ${settings.className} { \n`;
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    if (type ==="object" && Array.isArray(json[item])) {
      childs.push(creataChildArray(item, json));
    } else if (type ==="object") {
      childs.push(creataChildObject(item, json));
    }
    newText += `    public ${type} ${PasscalCase(item)} { get; set; } \n`;
  });
  newText += `}`;

  childs.map((item) => {
    newText += item;
  });

  setCode(newText);
};

function creataChildArray(item, json, child = false) {
  var childText = `\n\npublic class ${PasscalCase(item)} { \n`;
  Object.keys(child ? json : json[item][0]).map((name) => {
    var value = child ? json[name] : json[item][0][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    childText += `    public ${childType}  ${PasscalCase(
      name
    )} { get; set; } \n`;
    if (childText ==="object" && Array.isArray(value)) {
      childs.push(creataChildArray(value, json[item][0]));
    } else if (childType ==="object") {
      childs.push(creataChildObject(value, json[item][0]));
    }
  });
  childText += `}`;
  return childText;
}

function creataChildObject(item, json, child = false) {
  var childText = `\n\npublic class ${PasscalCase(item)} { \n`;
  Object.keys(child ? json : json[item]).map((name) => {
    var value = child ? json[name] : json[item][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    childText += `    public ${childType}  ${PasscalCase(
      name
    )} { get; set; } \n`;
    if (Array.isArray(value)) {
      childs.push(creataChildArray(name, value[0], true));
    } else if (childType ==="object") {
      childs.push(creataChildObject(name, value, true));
    }
  });
  childText += `}`;
  return childText;
}

export default CSharpConverter;
