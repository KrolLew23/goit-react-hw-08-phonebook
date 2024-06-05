import { useEffect, useState } from 'react';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import {
  fetchContacts,
  deleteContact,
  editContact,
} from '../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilters,
} from '../redux/selectors';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(selectContacts);
  const { filter } = useSelector(selectFilters);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleEdit = contact => {
    dispatch(editContact(contact));
    closeModal();
  };

  const handleModalOpen = e => {
    setIsEditModalOpen(true);
    setEditId(e);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const getFilteredContacts = () => {
    const filteredContactList =
      contacts &&
      contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .includes(filter.toLowerCase());
      });
    return filteredContactList;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3a3a3a',
        margin: 20,
        borderRadius: 10,
        paddingBottom: 30,
      }}>
      <h1>Create New Contact</h1>
      <ContactForm />
      <h1>Your Contacts</h1>
      <Filter />
      <ContactList
        contacts={getFilteredContacts()}
        handleEdit={handleEdit}
        closeModal={closeModal}
        handleDelete={handleDelete}
        handleModalOpen={handleModalOpen}
        isEditModalOpen={isEditModalOpen}
        editId={editId}
      />
    </div>
  );
};

export default Contacts;