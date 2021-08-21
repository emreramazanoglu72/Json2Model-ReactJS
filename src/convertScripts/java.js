function UpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const Types = [
  { string: "String" },
  { number: "Integer" },
  { boolean: "Boolean" },
  { object: "Object" },
];
var childs = [];
const JavaConverter = (text, setCode, settings) => {
  childs = [];
  const json = JSON.parse(text);
  const list = Object.keys(json);
  var newText = settings.entitys
    ? `@Entity \n public class ${settings.className} { \n`
    : `public class ${settings.className} { \n`;
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    if (type == "Object" && Array.isArray(json[item])) {
      childs.push(creataChildArray(item, json));
    } else if (type == "Object") {
      childs.push(creataChildObject(item, json));
    }
    newText += ` ${
      item.toLowerCase() == "id" && settings.entitys == true
        ? ` @Id\n @GeneratedValue\n`
        : settings.entitys == true
        ? `@Column(name="${item}")\n`
        : ""
    }    private ${
      type == "Object" ? `${UpperCase(item)}Child` : type
    } ${item}; \n`;
  });

  if (settings.constructor == true && settings.gettersetter == true) {
    var constructorText = ``;
    var getsetText = ``;
    constructorText = createConstructor(json, list, constructorText, settings);
    getsetText += creataGetterSetter(json, list, getsetText);
    newText += constructorText;
    newText += getsetText;
  } else if (settings.constructor == true) {
    var constructorText = ``;
    constructorText = createConstructor(json, list, constructorText, settings);
    newText += constructorText;
  } else if (settings.gettersetter == true) {
    var getsetText = ``;
    getsetText = creataGetterSetter(json, list, getsetText);
    newText += getsetText;
  }

  newText += `\n \n}`;

  childs.map((item) => {
    newText += `\n \n${item}`;
  });

  setCode(newText);
};

function creataChildArray(item, json, child = false) {
  var childText = `public class ${UpperCase(item)}Child { \n`;
  Object.keys(child ? json : json[item][0]).map((name) => {
    var value = child ? json[name] : json[item][0][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    childText += `    private ${childType} ${name}; \n`;
    if (childText == "object" && Array.isArray(value)) {
      childs.push(creataChildArray(value, json[item][0]));
    } else if (childType == "object") {
      childs.push(creataChildObject(value, json[item][0]));
    }
  });
  childText += `}`;
  return childText;
}

function creataChildObject(item, json, child = false) {
  var childText = `public class ${UpperCase(item)}Child { \n`;
  Object.keys(child ? json : json[item]).map((name) => {
    var value = child ? json[name] : json[item][name];
    var childType = Types.filter((filter) => filter[typeof value])[0][
      typeof value
    ];
    childText += `    private ${childType} ${name}; \n`;
    if (Array.isArray(value)) {
      childs.push(creataChildArray(name, value[0], true));
    } else if (childType == "object") {
      childs.push(creataChildObject(name, value, true));
    }
  });
  childText += `}`;
  return childText;
}

function createConstructor(json, list, newText, settings) {
  var classText = "";
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    classText += `${
      type == "Object" ? `${UpperCase(item)}Child` : type
    } ${item}, `;
  });
  newText = `\npublic ${settings.className}(${classText.substr(
    0,
    classText.length - 2
  )}) { \n `;
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    newText += `             this.${item} = ${item}; \n`;
  });
  newText += `   }`;
  return newText;
}

function creataGetterSetter(json, list, newText) {
  list.map((item) => {
    var type = Types.filter((filter) => filter[typeof json[item]])[0][
      typeof json[item]
    ];
    newText += `\n\npublic ${
      type == "Object" ? `${UpperCase(item)}Child` : type
    } get${UpperCase(item)}() {
          return ${item};
      } \n \npublic void set${UpperCase(item)}(${
      type == "Object" ? `${UpperCase(item)}Child` : type
    } ${item}) {
          this.${item} = ${item};
      } \n \n`;
  });

  return newText;
}

export default JavaConverter;
