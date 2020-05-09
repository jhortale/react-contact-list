import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    ContactsAPI.getAll().then((contacts) => setContacts(contacts));
  });

  const removeContact = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id));
    ContactsAPI.remove(contact);
  };

  const createContact = (contact) => {
    ContactsAPI.create(contact).then(setContacts(contacts.concat([contact])));
  };
  return (
    <Switch>
      <Route exact path="/">
        <ListContacts contacts={contacts} onDeleteContact={removeContact} />
      </Route>

      <Route path="/create">
        <CreateContact
          onCreateContact={(contact) => {
            createContact(contact);
          }}
        />
      </Route>
    </Switch>
  );
};

export default App;
