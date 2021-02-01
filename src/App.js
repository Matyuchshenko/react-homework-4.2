import React, { useMemo, useState } from "react";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import LocalStorage from "./components/hooks";
import s from "./App.module.css";

export default function App() {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = LocalStorage("contacts", []);

  console.log(contacts);

  const AddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const checkUnique = (name) => {
    return contacts.find((contact) => {
      return contact.name === name;
    });
  };

  const removeContact = (id) =>
    setContacts((prevContacts) => [
      ...prevContacts.filter((contact) => contact.id !== id),
    ]);

  const filterContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [filter, contacts]);
 
  return (
    <div className={s.App}>
      <h1>Phone book</h1>
      <ContactForm onAdd={AddContact} validateForm={checkUnique} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={(state) => setFilter(state)} />
      <ContactsList contacts={filterContacts} onRemove={removeContact} />
    </div>
  );
}
