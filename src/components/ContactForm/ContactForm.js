import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import s from "./ContactForm.module.css";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_STATE = {
  name: "",
  number: "",
};

export default function ContactForm({ validateForm, onAdd }) {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { name, number } = state;

  const handelChangeForm = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handelFormSubmit = e => {
    e.preventDefault();

    if (validateForm(name) != null) {
      toast.warn(name + " is already in contacts.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!name || !number) {
      toast.error("Some field is empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    onAdd({ id: uuid(), name: name, number: number });

    resetForm();
  };

  const resetForm = () => {
    setState({ ...INITIAL_STATE });
  };

    return (
        <form onSubmit={handelFormSubmit} className={s.form}>
          <label htmlFor="name_1">Name</label>
          <input
            className={s.input}
            type="text"
            name="name"
            id="name_1"
            placeholder="Enter name"
            value={name}
            onChange={handelChangeForm}
          />
          <label htmlFor="number_1">Number</label>
          <input
            className={s.input}
            type="tel"
            name="number"
            id="number_1"
            placeholder="Enter phone number"
            value={number}
            onChange={handelChangeForm}
          />
          <button className={s.button} type="submit">
            Add Contact
          </button>
          <ToastContainer />
        </form>
    );
  
}

ContactForm.defaultProps = {
  contacts: [],
  validateForm: () => {},
  onAdd: () => {},
};

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  validateForm: PropTypes.func,
  onAdd: PropTypes.func,
};
