import { highlight, languages } from "prismjs/components/prism-core";
import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import CSharpConverter from "../convertScripts/csharp";
import JavaConverter from "../convertScripts/java";
import PHPConverter from "../convertScripts/php";
import PythonConverter from "../convertScripts/python";
import FilterComponent from "./Filter";

const Container = () => {
  const [settings, setSettings] = useState({
    language: "PHP",
    entitys: false,
    constructor: false,
    gettersetter: false,
    className: "MyModel",
  });

  const [text, setText] = useState(`{
        "name":"Ashlee Buckner",
        "age":27,
        "eyeColor":"green",
        "totalProfit":45.50,
        "parent":{
          "isActive":true,
          "name":"Kathleen Poole",
          "age":36,
          "eyeColor":"blue",
          "parent":{
              "name":"Tillman Ryan"
           }
          },
          "friends":[
              {"id":0,"name":"Gaines Mccall"},
              {"id":1,"name":"Gabrielle Reid"},
              {"id":2,"name":"Mcguire Macias"}
          ]
      }`);
  const [defaultCode] = useState(``);
  const [code, setCode] = useState(defaultCode);

  const convert = () => {
    switch (settings.language) {
      case "Java":
        JavaConverter(text, setCode, settings);
        break;

      case "C#":
        CSharpConverter(text, setCode, settings);
        break;

      case "Python":
        PythonConverter(text, setCode, settings);
        break;

      case "PHP":
        PHPConverter(text, setCode, settings);
        break;

      default:
        JavaConverter(text, setCode, settings);
        break;
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(code)
  }

  useEffect(() => {
    setCode("");
  }, [settings]);

  return (
    <div className="container my-4 ">
      <FilterComponent settings={settings} setSettings={setSettings} />
      <hr/>
      <div className="text-center">
        <button
          onClick={() => {
            convert();
          }}
          className="btn btn-dark w-100"
        >
          Convert
        </button>
      </div>
      <hr/>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>JSON</label>
            <Editor
              value={text}
              onValueChange={(code) => setText(code)}
              highlight={(code) => highlight(code, languages.json)}
              className="form-control"
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                height: "100%",
                fontSize: 12,
              }}
            />
          </div>
        </div>
        {code.length > 1 && (
          <div className="col">
            <div className="form-group">
              <div className="d-flex justify-content-between">
                <label className="mt-2">Response</label>
                <button className="btn btn-dark m-1 btn-sm" onClick={copyText}>Copy</button>
              </div>
              <Editor
                value={code}
                highlight={(code) =>
                  highlight(
                    code,
                    settings.language ==="Java"
                      ? languages.java
                      : settings.language ==="Python"
                        ? languages.python
                        : languages.csharp
                  )
                }
                padding={10}
                disabled
                className="form-control"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  height: "100%",
                }}
              />
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Container;
