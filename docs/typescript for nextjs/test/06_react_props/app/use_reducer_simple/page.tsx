"use client";

import { useReducer } from "react";

type State = {
  theme: "dark" | "light";
  fontSize: number;
};

type Action =
  | {
      type: "TOGGLE_THEME";
    }
  | {
      type: "SET_FONT_SIZE";
      payload: number;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    case "SET_FONT_SIZE":
      return {
        ...state,
        fontSize: action.payload,
      };
    default:
      return state;
  }
}

export default function UseReducerSimplePage() {
  const [state, dispatch] = useReducer(reducer, {
    theme: "light",
    fontSize: 16,
  });
  return (
    <div style={{ fontSize: state.fontSize }}>
      <p>Current Theme: {state.theme}</p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 block w-full pointer-cursor m-2" onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 block w-full pointer-cursor m-2" onClick={() => dispatch({ type: "SET_FONT_SIZE", payload: 20 })}>
        Big Font
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 block w-full pointer-cursor m-2" onClick={()=> dispatch({type: "SET_FONT_SIZE", payload: 10})}>Small Font</button>
    </div>
  );
}
