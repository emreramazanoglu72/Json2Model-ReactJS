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

const PHPConverter = (text, setCode, settings) => {
    childs = [];
    const fillable = [];
    const json = JSON.parse(text);
    if(Array.isArray(json)){
        json = json[0];
      }
    const list = Object.keys(json);
    var newText = `<?php 

namespace APP;

use Illuminate\Database\Eloquent\Modal;

class ${settings.className} extends Model
{ 

    protected $table = '${settings.className}';

    public $timestamps = false;

    `;
    list.map((item) => {
        fillable.push(PasscalCase(item));
        var type = Types.filter((filter) => filter[typeof json[item]])[0][
            typeof json[item]
        ];
        if (type ==="object" && Array.isArray(json[item])) {
            childs.push(creataChildArray(item, json));
        } else if (type ==="object") {
            childs.push(creataChildObject(item, json));
        }
    });
    newText += `protected $fillable = ${JSON.stringify(fillable).replaceAll('"', "'")};
        
    protected $quarded = ['id'];
}`;


    childs.map((item) => {
        newText += item;
    });
    setCode(newText);
};



function creataChildArray(item, json, child = false) {
    var childText = `\n\nclass ${PasscalCase(item)} extends Model { \n
    protected $table = '${PasscalCase(item)}';

    public $timestamps = false;

    protected $fillable = ${JSON.stringify(Object.keys(json[item][0])).replaceAll('"', "'")};
    
    protected $quarded = ['id'];
        
}`;

    return childText;
}

function creataChildObject(item, json, child = false) {
    var childText = `\n\nclass ${PasscalCase(item)} extends Model { \n
    protected $table = '${PasscalCase(item)}';

    public $timestamps = false;

    protected $fillable = ${JSON.stringify(Object.keys(json[item])).replaceAll('"', "'")};
    
    protected $quarded = ['id'];
            
}`;
    
        return childText;
}

export default PHPConverter;
