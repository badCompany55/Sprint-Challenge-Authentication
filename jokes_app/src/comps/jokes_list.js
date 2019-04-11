import React, { useState, useEffect } from "react";
import axios from "axios";

import Joke from "./joke.js";

const JokeList = props => {
  const [jokes, setJokes] = useState([]);
  const getJokes = () => {
    const api = "http://www.localhost:3300/api/jokes";
    if (localStorage.getItem("token")) {
      const headers = { authorization: localStorage.getItem("token") };
      axios
        .get(api, { headers })
        .then(res => {
          setJokes(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    } else {
      props.history.replace("/login");
    }
  };
  useEffect(() => {
    getJokes();
  }, [jokes.length]);
  return (
    <div class="jokesCont">
      {jokes.map(j => {
        return <Joke joke={j.joke} />;
      })}
    </div>
  );
};

export default JokeList;
