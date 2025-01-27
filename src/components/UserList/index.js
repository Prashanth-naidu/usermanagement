import {Component} from 'react'
import Modal from 'react-modal'
import Listdetails from '../Listdetails'
import UserForm from '../UserForm'

import './index.css'

class UserList extends Component {
  state = {
    userList: [],
    error: '',
    currentUser: null,
    showEmailError: false,
    emailError: '',
    showAddBtn: false,
  }

  onToggleMailError = () => {
    this.setState(prevState => ({
      showError: !prevState.showError,
    }))
  }

  onToggleForm = user => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      currentUser: user,
    }))
  }

  onClickAddUser = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      currentUser: null,
    }))
  }

  onAddEditError = msg => {
    // const error = `${msg.status} ${msg.url}`
    const error = msg
    this.setState(prevState => ({
      showError: !prevState.showError,
      error: error,
    }))
  }

  onSave = user => {
    const {userList} = this.state
    if (user.id) {
      const filteredList = userList.filter(each => each.id !== user.id)
      this.setState(prevState => ({
        userList: [...filteredList, user],
        isOpen: !prevState.isOpen,
      }))
    } else {
      const unique = userList.some(each => each.email === user.email)
      if (!unique) {
        const id = Math.floor(Math.random() * 10) + 1
        const newOne = {...user, id}
        this.setState(prevState => ({
          userList: [...prevState.userList, newOne],
          isOpen: !prevState.isOpen,
        }))
      } else {
        const error = 'Entered an existing email. Please, choose an unique one'
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
          showError: !prevState.showError,
          error: error,
        }))
      }
    }
  }

  onClickDelete = async id => {
    const {userList} = this.state
    const filteredList = userList.filter(each => each.id !== id)
    const url = `https://jsonplaceholder.typicode.com/users/${id}`
    const options = {
      method: 'DELETE',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        this.setState({userList: filteredList})
      } else {
        throw new Error(`${response.status} ${response.url}`)
      }
    } catch (error) {
      const deleteError = error.message
      this.setState(prevState => ({
        showError: !prevState.showError,
        error: deleteError,
      }))
    }
  }

  componentDidMount() {
    this.getUserList()
  }

  getUserList = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        this.setState(prevState => ({
          userList: data,
          showAddBtn: !prevState.showAddBtn,
        }))
      } else {
        throw new Error(`${response.status} ${response.url}`)
      }
    } catch (error) {
      const fetchError = error.message
      this.setState(prevState => ({
        showError: !prevState.showError,
        error: fetchError,
      }))
    }
  }

  render() {
    const {userList, isOpen, currentUser, showError, error, showAddBtn} =
      this.state
    return (
      <div>
        {!showError ? (
          <div className="home_bg">
            <img
              src="https://www.ajackus.com/images/company/ajackus-story.gif"
              alt="AJACKUS"
              className="img_logo"
            />
            <h1 className="heading">User Management</h1>
            {showAddBtn && (
              <button
                type="button"
                className="btn"
                onClick={this.onClickAddUser}
              >
                Add User
              </button>
            )}
            <div className="table_container ">
              <table
                border="0"
                cellPadding="10"
                style={{marginTop: '20px'}}
                className="list_table"
              >
                <thead>
                  <tr className="tableHeading">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map(each => (
                    <Listdetails
                      key={each.id}
                      details={each}
                      onClickDelete={this.onClickDelete}
                      onClickEdit={this.onToggleForm}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              isOpen={isOpen}
              onRequestClose={this.onToggleForm}
              contentLabel="User Form"
            >
              <UserForm
                userDetails={currentUser}
                onSave={this.onSave}
                onAddEditError={this.onAddEditError}
              />
              <button type="button" className="btn" onClick={this.onToggleForm}>
                go back
              </button>
            </Modal>
          </div>
        ) : (
          <Modal isOpen={showError} contentLabel="User Form">
            <div className="error_container">
              <img
                src="https://cdn.vectorstock.com/i/500p/62/37/unhappy-person-sitting-om-ground-cartoon-stick-vector-45926237.jpg"
                alt="ERROR"
                className="error_logo"
              />
              <h1 className="error_msg">{error}</h1>
              <button
                type="button"
                className="btn"
                onClick={this.onToggleMailError}
              >
                Get Back To List
              </button>
            </div>
          </Modal>
        )}
      </div>
    )
  }
}

export default UserList
