import { useState, useEffect } from 'react'
import PhoneBook from './PhoneBook'
import PersonForm from './forms/Person'
import NameFilter from './forms/NameFilter'
import PersonService from './services/persons'
import Notification from './notifications/Notification'
import NotificationTool from './notifications/notification_tool'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newPerson, setNewPerson] = useState({
    name: '', number: ''
  })
  const [notification, setNotification] = useState({message: '', tone: null})
  const [persons, setPersons] = useState([])

  const ConfirmUpdatePersonMessage =  (person) => {
    return `${person.name} already in the PhoneBook. Do you want to update the number?`
  }
  const ConfirmDeletePersonMessage = (person) => {
    return `Do you really want to delete ${person.name} from the PhoneBook?`
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(NotificationTool.BaseNotification)
    }, 2000)
    return () => clearTimeout(timer)
  }, [notification])

  const fetchPersons = () => {
    PersonService.
    getAll().
    then(returnedPersons => setPersons(returnedPersons))
  }

  useEffect(() => {
    fetchPersons();
  }, [])

  const AddToPhonebook = async (event) => {
    event.preventDefault();
    const alreadyInPhonebook = persons.find((person) => person.name === newPerson.name);
    if (alreadyInPhonebook) {
      if (window.confirm(ConfirmUpdatePersonMessage(newPerson))) {
        updatePerson(alreadyInPhonebook);
      }
    }
    else {
      PersonService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotification(NotificationTool.PersonAddedNotification(newPerson));
      })
      .catch(error => {
        console.log("error creating person: ", error);
        setNotification(NotificationTool.PersonNotAddedNotification(newPerson, error))
      });
    }
  }

  const updatePerson = (PersonToUpdate) => {
    PersonService.
    update(PersonToUpdate.id, newPerson).
    then(returnedPerson => {
      setPersons(persons.map(
        person => person.id !== PersonToUpdate.id ? person : returnedPerson
        ));
        setNotification(NotificationTool.PersonUpdateNotification(newPerson))
      }
    )
    .catch(error => {
      console.log("Error updating person. ", error);
      setNotification(NotificationTool.AlreadyRemovedPersonNotification(newPerson));
      fetchPersons();
    })
  }

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  };

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };

  const handleDeletePerson = ({person}) => {
    if (window.confirm(ConfirmDeletePersonMessage(person))) {
      PersonService.
      delete_entry(person.id).
      then(returnedPersons => setPersons(returnedPersons))
      setNotification(NotificationTool.PersonDeletedNotification(person))
      }
  }

  return (
    <div>
      <h2>Phonebook tool</h2>
      <Notification message={notification.message} tone={notification.tone}/>
      <NameFilter onchange={handleFilterChange}/>
      <PersonForm onsubmit={AddToPhonebook} handlenamechange={handleNameChange} handlenumberchange={handleNumberChange}/>
      <PhoneBook 
        persons={persons.filter(person => (person.name.includes(filter)))}
        ondeletebutton={handleDeletePerson}/>
      ...
    </div>
  )
}

export default App
