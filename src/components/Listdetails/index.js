import './index.css'

const Listdetails = props => {
  const {onClickDelete, details, onClickEdit} = props
  const {id, name, email, company} = details
  const department = typeof company === 'object' ? company.name : company
  const onClickedDelete = () => {
    onClickDelete(id)
  }

  const onClickedEdit = () => {
    onClickEdit(details)
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{department}</td>
      <td>
        <button type="button" onClick={onClickedEdit} className="table_btn">
          Edit
        </button>
        <button type="button" onClick={onClickedDelete} className="table_btn">
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Listdetails
