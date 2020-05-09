import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";

const CreateContact = ({ onCreateContact }) => {
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const value = serializeForm(e.target, { hash: true });
    if (onCreateContact) {
      onCreateContact(value);
      history.push("/");
    }
  };
  return (
    <div>
      <Link to="/" className="close-create-contact">
        Close
      </Link>
      <form onSubmit={onSubmit} className="create-contact-form">
        <ImageInput
          className="create-contact-avatar-input"
          name="avatarURL"
          maxHeight={64}
        />
        <div className="create-contact-details">
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Handle" name="handle" />
          <button>Add Contact</button>
        </div>
      </form>
    </div>
  );
};

CreateContact.propTypes = {
  onCreateContact: PropTypes.func.isRequired,
};

export default CreateContact;
