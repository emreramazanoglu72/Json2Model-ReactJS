function UpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const Types = [
  { string: "serializers.CharField()" },
  { number: "serializers.IntegerField()" },
  { boolean: "serializers.BooleanField()" },
  { object: "object" },
];
var childs = [];

const PythonConverter = (text, setCode, settings) => {
  childs = [];
  const json = JSON.parse(text);
  const list = Object.keys(json);
  var newText = `from rest_framework import serializers  \n \n`;
  newText += `class ${settings.className}Serializer(serializers.Serializer): \n`;
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    newText += `    ${UpperCase(item)} = ${type ==="object" ? `${UpperCase(item)}Serializer()` : type}\n`;
    if (type ==="object" && Array.isArray(json[item])) {
      childs.push(creataChildArray(item, json));
    } else if (type ==="object") {
      childs.push(creataChildObject(item, json));
    }
  });
  newText += `\n\n`;

  childs.map((item) => {
    newText += item;
  });

  setCode(newText);
};

function creataChildArray(item, json, child = false) {
  var newText = `class ${UpperCase(item)}Serializer(serializers.Serializer): \n`;
  Object.keys(child ? json : json[item][0]).map((name) => {
    var value = child ? json[name] : json[item][0][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    newText  += `    ${UpperCase(item)} = ${childType}\n`;
    if (newText ==="object" && Array.isArray(value)) {
      childs.push(creataChildArray(value, json[item][0]));
    } else if (childType ==="object") {
      childs.push(creataChildObject(value, json[item][0]));
    }
  });
  newText += `\n\n`;
   return newText;
}

function creataChildObject(item, json, child = false) {
  var newText = `class ${UpperCase(item)}Serializer(serializers.Serializer): \n`;
    Object.keys(child ? json : json[item]).map((name) => {
    var value = child ? json[name] : json[item][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    newText  += `    ${UpperCase(item)} = ${childType}\n`;
    if (Array.isArray(value)) {
      childs.push(creataChildArray(name, value[0], true));
    } else if (childType ==="object") {
      childs.push(creataChildObject(name, value, true));
    }
  });
  newText += `\n\n`;
  return newText;
}

export default PythonConverter;
