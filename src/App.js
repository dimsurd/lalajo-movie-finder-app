import { useState, useEffect } from "react";
import "./App.css";
import CollectionsMovies from "./new_template_forms/collections.movies";
import FormsMain from "./new_template_forms/forms.main";
import axios from "axios";

// import FormsMovie from "./template_forms/form.movie";

function App() {
  const [titleMovies, setTitleMovies] = useState("");
  const [triggerButton, setTriggerButton] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [testTrigger, settestTrigger] = useState("");

  const [dataMovies, setDataMovies] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // triggerSearch(true);
    console.log("submited");
    setTriggerButton(true);
  };

  const SayIt = () => {
    setTriggerButton(false);
  };

  //   Fetch Api
  useEffect(() => {
    let isFlushed = false;

    if (!isFlushed) {
      setLoadingData(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}&t=${titleMovies}`,
      })
        .then((results) => {
          // console.log(results.data);
          setDataMovies([results.data]);
          SayIt();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingData(false);
        });
    }

    return () => {
      isFlushed = true;
      //   triggerSearch(false);
    };
  }, [triggerButton]);
  //   End Fetch Api

  return (
    <>
      <h1 className="text-5xl mt-4 font-bold  text-center text-indigo-800">
        Lalajo
      </h1>
      <p className="text-3xl mt-2 font-medium text-center text-indigo-800">
        Find your memorable movies using{" "}
        <span className="font-bold underline">lalajo</span> movies finder
      </p>
      {/* <FormsMovie /> */}
      <FormsMain
        setTitle={setTitleMovies}
        triggerSearch={setTriggerButton}
        settestTrigger={settestTrigger}
        onSubmitHandler={onSubmitHandler}
      />

      <CollectionsMovies
        onLoads={loadingData}
        title={titleMovies}
        triggerSearch={triggerButton}
        testTrigger={testTrigger}
        movies={dataMovies}
      />
    </>
  );
}

export default App;
