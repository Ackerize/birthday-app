import React, { useState, useEffect, useContext } from "react";
import { SearchBar } from "../components/SearchBar";
import { MdAddAlarm } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { map } from "lodash";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { BirthdayItem } from "../components/BirthdayItem";

export const HomeScreen = () => {
  const {
    user: { id },
  } = useContext(AuthContext);
  const history = useHistory();
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    setBirthdays([]);
    axios
      .get(`${API_URL}/birthdays/${id}`)
      .then(({ data }) => {
        setBirthdays(data);
      })
      .catch(({ response }) => {
        const { status } = response;
        if (status === 404) {
          setBirthdays([0, "You still don't have birthdays created"]);
        }
      });
  }, []);

  return (
    <>
      <div className="header-content">
        <SearchBar setBirthdays={setBirthdays} />
        <div className="btn container-nueva-note" id="container-btn">
          <button
            className="btn btn--blue btn--radius-2 custom-add-note"
            onClick={() => history.push("/birthday")}
          >
            <MdAddAlarm />
            Add
          </button>
        </div>
      </div>
      {birthdays[0] === 0 ? (
        <h3 key={0}>{birthdays[1]}</h3>
      ) : (
        <div>
          {map(birthdays, ({ id, person, birthday }) => (
            <BirthdayItem key={id} id={id} birthday={birthday} person={person}/>
          ))}
        </div>
      )}
    </>
  );
};
