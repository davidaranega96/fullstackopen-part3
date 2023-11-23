const Person = ({ person, ondeletebutton }) => {
    return(
        <div>
        <li>{person.name} {person.number} <button onClick={() => ondeletebutton({person})}>Delete</button></li>
        </div>
    )
}

const PhoneBook = ({ persons, ondeletebutton }) => {
    return (
        <div>
            <h1>PhoneBook</h1>
        <ul>
        {persons.map((person, index) => (
        <Person key={index} person={person} ondeletebutton={ondeletebutton}/>
        ))}
        </ul>
        </div>
    )
}


export default PhoneBook
