import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListContacts = ({ contacts, onDeleteContact }) => {
  const initialState = {
    query: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { query } = formData;

  const updateQuery = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateContactList =
    query === ""
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  const resetQuery = () => setFormData({ ...formData, query: "" });
  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search Contacts"
          value={formData.query}
          name="query"
          onChange={(e) => updateQuery(e)}
        />
        <Link to="/create" className="add-contact">
          Add Contact
        </Link>
      </div>
      {updateContactList.length !== contacts.length && (
        <div className="showing-contacts">
          <span>
            Now showing {updateContactList.length} of {contacts.length}
          </span>
          <button onClick={resetQuery}>Show all</button>
        </div>
      )}
      <ol className="contact-list">
        {updateContactList.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div
              className="contact-avatar"
              style={{
                backgroundImage: `url(${contact.avatarURL})`,
              }}
            />
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button
              className="contact-remove"
              onClick={() => onDeleteContact(contact)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ListContacts;
