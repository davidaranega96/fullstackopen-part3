const PersonForm = ({ onsubmit, handlenamechange, handlenumberchange}) => {
    return (
        <div>
            <h1>New Contact</h1>
            <form onSubmit={onsubmit}>
                <div>
                    name: <input type="text" onChange={handlenamechange} />
                </div>
                <div>
                    number: <input type="text" onChange={handlenumberchange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
