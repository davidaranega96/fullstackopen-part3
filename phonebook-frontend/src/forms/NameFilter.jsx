const NameFilter = ({ onchange }) => {
    return (
        <form>
        <div>
          filter: <input type="text" onChange={onchange}/>
        </div>
      </form>
    )
}

export default NameFilter
