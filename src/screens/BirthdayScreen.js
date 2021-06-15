import React, { useState, useEffect, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import { API_URL, formatMySQLDate } from "../utils/constants";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

export const BirthdayScreen = () => {
  const {
    user: { id },
  } = useContext(AuthContext);

  let { idBirthday } = useParams();

  const [birthday, setBirthday] = useState(null);
  const [date, setDate] = useState(new Date());

  const [values, handleInputChange, , updateState] = useForm({
    person: "",
    birthday: "",
    idUser: id,
  });

  useEffect(() => {
    if (idBirthday) {
      axios
        .get(`${API_URL}/birthdays/find/${id}/${idBirthday}`)
        .then(({ data }) => {
          const { person, birthday } = data;
          setBirthday(data);
          updateState({
            person,
            birthday,
            idUser: id,
          });
          setDate(new Date(birthday));
        });
    }
  }, []);

  const history = useHistory();

  const onDelete = () => {
    Swal.fire({
      title: "Do you want to remove this birthday?",
      showCancelButton: true,
      confirmButtonText: `Accept`,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF5555",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/birthdays/${idBirthday}`).then((result) => {
          Swal.fire(
            "Birthday removed!",
            "The birthday has been successfully removed",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              history.push("/home");
            }
          });
        });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...values,
      birthday: formatMySQLDate(date),
    };

    if (birthday) {
      axios
        .put(`${API_URL}/birthdays/${idBirthday}`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "Birthday updated!",
            text: "The birthday has been successfully updated",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    } else {
      axios
        .post(`${API_URL}/birthdays/new`, data)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: "Birthday created!",
            text: "The birthday has been successfully created",
            showConfirmButton: false,
            timer: 1400,
          });
          setTimeout(() => {
            history.push("/home");
          }, 1400);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  };

  return (
    <>
      <div className="page-wrapper p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5 card-painting">
            <div className="card-heading heading-task">
              <IoMdArrowBack
                className="back-btn"
                onClick={() => {
                  history.push("/home");
                }}
              />
              <div className="title-container title-note-container">
                <h2 className="title title-note">New birthday</h2>
              </div>
            </div>
            <div className="card-body card-body-painting">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="name label-text">Name: </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="person"
                        value={values.person}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name label-text">Birthday: </div>
                  <div className="value">
                    <div className="input-group">
                      <DatePicker
                        date={date}
                        onDateChange={setDate}
                        locale={enGB}
                      >
                        {({ inputProps, focused }) => (
                          <input
                            className={
                              "input-date-picker" + (focused ? " -focused" : "")
                            }
                            {...inputProps}
                          />
                        )}
                      </DatePicker>
                    </div>
                  </div>
                </div>

                <div className="btn-groups">
                  <div className="btn" id="container-btn">
                    <button
                      className="btn btn--blue btn--radius-2"
                      type="submit"
                      id="btn-submit"
                    >
                      Save
                    </button>
                  </div>
                  {birthday && (
                    <div className="btn" id="container-btn-register">
                      <button
                        className="btn btn--red btn--radius-2"
                        type="button"
                        onClick={onDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
