import React from "react";

export default function FilterComponent({ settings, setSettings }) {
  return (
    <div className=" mb-4">
      <div id="accordianId" role="tablist" aria-multiselectable="true">
        <div className="card">
          <div role="tab" id="section1HeaderId">
            <h5 className="mr-2 p-4 pb-0">
              <a
                data-toggle="collapse"
                data-parent="#accordianId"
                href="#section1ContentId"
                aria-expanded="true"
                aria-controls="section1ContentId"
                className="text-dark"
              >
                Filter
              </a>
            </h5>
          </div>
          <div
            id="section1ContentId"
            className="collapse in show"
            role="tabpanel"
            aria-labelledby="section1HeaderId"
          >
            <div className=" pl-4 pr-4 row">
              <div className="col form-group">
                <label>Language</label>
                <select
                  className="form-control"
                  value={settings.language}
                  onChange={(item) =>
                    setSettings({ ...settings, language: item.target.value })
                  }
                >
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="Python">Python (serializers) </option>
                </select>
              </div>
              {settings.language == "Java" && (
                <div className="col form-group">
                  <label>Options</label>
                  <br />
                  <input
                    type="text"
                    className="form-controll"
                    placeholder="Class Name"
                    defaultValue={settings.className}
                    onChange={(text) =>
                      setSettings({ ...settings, className: text.target.value })
                    }
                  />

                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(item) =>
                          setSettings({
                            ...settings,
                            entitys: item.target.checked,
                          })
                        }
                        value="checkedValue"
                      />
                      Create Entity (HiberNate)
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(item) =>
                          setSettings({
                            ...settings,
                            gettersetter: item.target.checked,
                          })
                        }
                        value="checkedValue"
                      />
                      Create Getter Setter
                    </label>
                  </div>

                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(item) =>
                          setSettings({
                            ...settings,
                            constructor: item.target.checked,
                          })
                        }
                        value="checkedValue"
                      />
                      Create Constructor
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
