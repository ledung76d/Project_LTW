import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

class Shipping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      validated: false,
      title: '',
      address: props.userInfo.address,
    }
  }
  handleClose = () =>
    this.setState({ modal: false, title: '', address: '', validated: false }) //ẩn form
  handleShow = () => this.setState({ modal: true }) //hiện form
  handleAddShipAddress = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    this.setState({ validated: true })
  }

  handleSave = () => {
    this.props.setAddres(this.state.address)
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <>
        <div className='co-shipping-address'>
          <div className='co-item'>
            <div className='co-item-box'>
              <span className='item-index'>2</span>
              <h3 className='item-text'>Shipping Address</h3>
            </div>
            <button
              className='btn item-btn'
              type='button'
              onClick={() => this.setState({ modal: true })}
            >
              <svg
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4 stroke-2 me-0.5'
                data-selected='true'
                data-label-id='0'
                // data-metatip='true'
                className='svg-plus'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                ></path>
              </svg>
              Add
            </button>
          </div>
          <div className='co-content h-126 active'>
            <p className='item-title'>
              Shipping
              <button className='add-address'>
                <svg
                  className='w-3 h-3'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='icon-add'
                >
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                </svg>
              </button>
              <button className='delete-address'>
                <svg
                  className='w-3 h-3'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='icon-delete'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </p>
            <p className='item-address'>
              {this.state.address}
            </p>
          </div>
        </div>
        <Modal
          show={this.state.modal}
          onHide={this.handleClose}
          centered
          className='ship-modal'
        >
          <Modal.Header className='ship-modal-header'>
            <h4 className='ship-modal-title'>Add New Address</h4>
          </Modal.Header>
          <Modal.Body className='ship-modal-body m-5'>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleAddShipAddress}
            >
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Title'
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({
                      title: e.target.value,
                    })
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  Title is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className='ship-address'
                  required
                  as='textarea'
                  value={this.state.address}
                  onChange={(e) => {
                    return this.setState({
                      address: e.target.value,
                    })
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  Address is required
                </Form.Control.Feedback>
              </Form.Group>

              <div className='d-grid gap-2 pt-15'>
                <Button variant='success bold ship-button' type='submit' onClick={() => this.handleSave(this.state.address)}>
                  Save Address
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Shipping
