import axios from "axios";
import React, { useContext } from "react";
import validator from "validator";
import { AuthContext } from "../auth/AuthContext";
import { useForm } from "../hooks/useForm";
import { API_URL } from "../utils/constants";

export const SearchBar = ({ setNotes }) => {
  const {
    user: { id },
  } = useContext(AuthContext);

  const [values, handleInputChange] = useForm({
    text: "",
  });

  const onSearch = (e) => {
    e.preventDefault();
    if(!validator.isEmpty(values.text)) {
      axios
      .get(`${API_URL}/notes/search/${id}/${values.text}`)
      .then(({ data }) => {
        setNotes(data);
      })
      .catch(({ response }) => {
        const { status } = response;
        if (status === 404) {
          setNotes([0, `No se encontró ninguna nota que coincida con '${values.text}'.`]);
        }
      });
    }
  };
  return (
    <div className="s006">
      <form onSubmit={onSearch}>
        <fieldset>
          <div className="inner-form">
            <div className="input-field">
              <button className="btn-search" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </button>
              <input
                id="search"
                type="text"
                placeholder="Escribe algo"
                autoComplete="off"
                name="text"
                value={values.text}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
