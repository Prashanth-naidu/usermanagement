import {Component} from 'react'
import './index.css'

class UserForm extends Component {
  constructor(props) {
    super(props)
    const {userDetails} = this.props
    this.state = {
      firstName: userDetails ? userDetails.name.split(' ')[0] : '',
      lastName: userDetails ? userDetails.name.split(' ')[1] : '',
      email: userDetails ? userDetails.email : '',
      id: userDetails ? userDetails.id : null,
      company: userDetails ? userDetails.company.name : '',
    }
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangeCompany = event => {
    this.setState({company: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {id, firstName, lastName, email, company} = this.state
    const {onSave, onAddEditError} = this.props
    if (!firstName || !lastName || !email || !company) {
      alert('All fields are required')
      return
    }
    const newObj = {
      id,
      name: `${firstName} ${lastName}`.trim(),
      email: email.trim(),
      company: {
        name: company.trim(),
      },
    }
    const url = id
      ? `https://jsonplaceholder.typicode.com/users/${id}`
      : 'https://jsonplaceholder.typicode.com/users'

    const option = {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(newObj),
    }
    try {
      const response = await fetch(url, option)
      if (response.ok) {
        onSave(newObj)
        this.setState({
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          company: '',
        })
      } else {
        throw new Error(`${response.status} ${response.url}`)
      }
    } catch (error) {
      onAddEditError(error.message)
    }
  }

  render() {
    const {firstName, lastName, email, company} = this.state
    return (
      <div className="form_bg">
        <img
          src="https://www.ajackus.com/images/company/ajackus-story.gif"
          alt="Ajackus"
          className="form_img_logo"
        />
        <form onSubmit={this.onSubmitForm} className="form_ele">
          <p>User Details</p>
          <input
            type="text"
            value={firstName}
            placeholder="FirstName"
            onChange={this.onChangeFirstName}
            className="input_ele"
          />
          <input
            type="text"
            value={lastName}
            placeholder="LastName"
            onChange={this.onChangeLastName}
            className="input_ele"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.onChangeEmail}
            className="input_ele"
          />
          <input
            type="text"
            value={company}
            placeholder="Department"
            onChange={this.onChangeCompany}
            className="input_ele"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default UserForm
