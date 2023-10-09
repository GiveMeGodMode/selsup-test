import React, { useState } from "react";

enum ParamType {
  String = "string",
  Number = "number",
  Select = "select",
}

interface Param {
  id: number;
  name: string;
  type: ParamType;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const Main: React.FC<Props> = ({ params, model }) => {
  const [item, setItem] = useState(model);
  const [showModel, setShowModel] = useState(false);
  const getModel = () => {
    setShowModel(true);
  };

  const changeParam = (value: string, paramIndex: number, id: number) => {
    const updatedParamValues = [...item.paramValues];
    updatedParamValues[paramIndex].value = value;
    setItem((state) => ({ ...state, paramValues: updatedParamValues }));
  };

  return (
    <div className="container">
      {params.map((item, index) => (
        <div className="row w-25 mt-1" key={index}>
          <div className="col-sm mx-auto">{item.name}</div>
          {item.type === ParamType.String && (
            <input
              className="form-control lg"
              type="text"
              value={
                model.paramValues.find(
                  (paramValue) => paramValue.paramId === item.id
                )?.value || ""
              }
              onChange={(event) =>
                changeParam(event.target.value, index, item.id)
              }
            />
          )}
          {item.type === ParamType.Number && (
            <select
              className="form-select form-select-lg-12"
              onChange={(event) =>
                changeParam(event.target.value, index, item.id)
              }
            >
              {["Акустика", "Электро", "Бас"].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          )}
          {item.type === ParamType.Select && (
            <select
              className="form-select form-select-lg-12"
              onChange={(event) =>
                changeParam(event.target.value, index, item.id)
              }
            >
              {["Черный", "Красный", "Синий", "Белый"].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        className="btn btn-outline-warning border-1 rounded-5 mt-2 text-uppercase"
        onClick={getModel}
      >
        Показать модель
      </button>
      {showModel && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {item.paramValues.map((paramValue, index) => (
              <tr key={index}>
                <td>
                  {
                    params.find((param) => param.id === paramValue.paramId)
                      ?.name
                  }
                </td>
                <td>{paramValue.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default function App() {
  const params = [
    { id: 1, name: "Инструмент", type: ParamType.String },
    { id: 2, name: "Тип инструмента", type: ParamType.Number },
    { id: 3, name: "Цвет", type: ParamType.Select },
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: "Гитара" },
      { paramId: 2, value: "Акустика" },
      { paramId: 3, value: "Черный" },
    ],
  };

  return (
    <div className="App">
      <Main model={model} params={params} />
    </div>
  );
}
