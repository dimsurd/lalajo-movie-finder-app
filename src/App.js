import "./App.css";

import FormsMovie from "./template_forms/form.movie";

function App() {
  return (
    <>
      <h1 className="text-5xl mt-4 font-bold  text-center text-indigo-800">
        Lalajo
      </h1>
      <p className="text-3xl mt-2 font-medium text-center text-indigo-800">
        Find your memorable movies using{" "}
        <span className="font-bold underline">lalajo</span> movies finder
      </p>
      <FormsMovie />
    </>
  );
}

export default App;
