import "./App.css";
import { useReducer } from "react";

const initialState = {
    input: "",
    result: "",
    calculatingStatus: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_INPUT":
            if (state.input === "" && "+/*-".includes(action.payload)) {
                return state;
            } else if (
                "+/*-".includes(state.input.slice(-1)) &&
                "+/*-".includes(action.payload)
            ) {
                return {
                    ...state,
                    input: state.input.slice(0, -1) + action.payload,
                    calculatingStatus: true,
                };
            } else {
                return {
                    ...state,
                    input: state.input + action.payload,
                    calculatingStatus: true,
                };
            }
        case "CALCULATE":
            if (state.input == "") return state;

            try {
                return {
                    ...state,
                    calculatingStatus: false,
                    result: eval(state.input).toString(),
                    input: "",
                };
            } catch (error) {
                return { ...state, input: "Error", calculatingStatus: true };
            }

        case "CLEAR":
            return initialState;
        case "DELETE":
            return {
                ...state,
                input: state.input.slice(0, -1),
                calculatingStatus: true,
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (btnVal) => {
        if (btnVal == "=") {
            dispatch({ type: "CALCULATE" });
        } else if (btnVal == "AC") {
            dispatch({ type: "CLEAR" });
        } else if (btnVal === "Del") {
            dispatch({ type: "DELETE" });
        } else {
            dispatch({ type: "ADD_INPUT", payload: btnVal });
        }
    };

    return (
        <div className="app">
            {/* <h1>Calculator App</h1> */}

            <div className="btn-container">
                <div>
                    <input
                        type="text"
                        placeholder="0"
                        readOnly
                        value={
                            state.calculatingStatus ? state.input : state.result
                        }
                    />
                </div>
                <div className="g-1">
                    <button
                        className="btn-ac"
                        onClick={() => handleClick("AC")}
                    >
                        AC
                    </button>
                    <button onClick={() => handleClick("Del")}>Del</button>
                    <button onClick={() => handleClick("+")}>+</button>
                </div>

                <div className="g-1">
                    <button onClick={() => handleClick(7)}>7</button>
                    <button onClick={() => handleClick(8)}>8</button>
                    <button onClick={() => handleClick(9)}>9</button>
                    <button onClick={() => handleClick("*")}>*</button>
                </div>
                <div className="g-1">
                    <button onClick={() => handleClick(4)}>4</button>
                    <button onClick={() => handleClick(5)}>5</button>
                    <button onClick={() => handleClick(6)}>6</button>
                    <button onClick={() => handleClick("/")}>/</button>
                </div>
                <div className="g-1">
                    <button onClick={() => handleClick(1)}>1</button>
                    <button onClick={() => handleClick(2)}>2</button>
                    <button onClick={() => handleClick(3)}>3</button>
                    <button onClick={() => handleClick("-")}>-</button>
                </div>
                <div className="g-1">
                    <button onClick={() => handleClick(".")}>.</button>
                    <button onClick={() => handleClick(0)}>0</button>
                    <button
                        className="btn-zero"
                        onClick={() => handleClick("=")}
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
