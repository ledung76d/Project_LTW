import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      phoneNumber: props.userInfo.phone,
    };
  }

  handleSave = () => {
    this.props.setPhoneNumber(this.state.phoneNumber);
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <>
        <div className="co-contact">
          <div className="co-item">
            <div className="co-item-box">
              <span className="item-index">1</span>
              <h3 className="item-text">Contact Number</h3>
            </div>
            <button
              className="btn item-btn"
              type="button"
              onClick={() => this.setState({ modal: true })}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 stroke-2 me-0.5 svg-plus"
                data-selected="true"
                data-label-id="0"
                // data-metatip='true'
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Update
            </button>
          </div>
          <div className="co-content active">
            <p className="item-linenumber">{this.state.phoneNumber}</p>
          </div>
        </div>
        <Modal
          toggle={() => this.setState({ modal: !this.state.modal })}
          isOpen={this.state.modal}
          centered
          className="contact-modal"
        >
          <ModalHeader className="contact-modal-header">
            <h6 className="contact-modal-title">Update Contact Number</h6>
          </ModalHeader>
          <ModalBody className="contact-modal-body">
            <FormGroup>
              <InputGroup>
                <InputGroupText>+84</InputGroupText>
                <Input
                  type="number"
                  value={this.state.phoneNumber}
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                />
                <Button
                  color="success btn-custom h-auto"
                  onClick={() => this.handleSave}
                >
                  Save
                </Button>
              </InputGroup>
            </FormGroup>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
