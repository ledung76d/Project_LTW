import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ImageUpload from './ImageUpload'
import { v4 as uuidv4 } from 'uuid'
import { deleteProductById, handleGetCategoryById } from '../../../services/productService'
import { cloudinaryUpload } from '../../../services/userService'
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import adminService from '../../../services/adminService'
class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [], // lưu props của ảnh
      showEdit: false, // hiện ẩn modal edit
      showDelete: false, // hiện ẩn modal edit
      details: { ...this.props.info }, // lưu các props của 1 sản phẩm
      listCategory: null
    }
  }

  async componentDidMount() {
    let data = await handleGetCategoryById(this.state.details.pid)
    //console.log(data.category)
    this.setState({
      listCategory: data.category
    })
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach((file) => URL.revokeObjectURL(file.preview))
  }

  addFile = (file) => {
    console.log(file)
    this.setState({
      files: file.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    })
  }

  handleCloseEdit = () => this.setState({ showEdit: false })
  handleOpenEdit = () => this.setState({ showEdit: true })

  handleCloseDelete = () => this.setState({ showDelete: false })
  handleOpenDelete = () => this.setState({ showDelete: true })

  deleteProducts = (id) => {
    this.handleOpenDelete()
    //console.log(id)
  }

  editProducts = (id) => {
    this.handleOpenEdit()
    console.log(id)
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    })
  }

  handleClickBack = () => {
    this.setState({ details: {} })
    this.handleCloseEdit()
  }

  handleClickUpdate = async () => {
    // this.props.info['title'] = this.state.details['title']
    // this.props.info['unit'] = this.state.details['unit']
    // this.props.info['content'] = this.state.details['content']
    // this.props.info['price'] = this.state.details['price']
    // this.props.info['quantity'] = this.state.details['quantity']
    // if (this.state.files.length > 0) {
    //   this.props.info['img'] = this.state.files[0].preview
    // }
    let product = {
      ...this.state.details,
      discount: Number.parseInt(this.state.details.discount),
      price: Number.parseFloat(this.state.details.price),
      quantity: Number.parseInt(this.state.details.quantity),
    }
    await adminService.handleUpdateProductByStore(product)
    this.reRenderList()
    this.handleCloseEdit()
  }

  handleClickCancel = () => {
    this.handleCloseDelete()
  }

  handleClickDelete = async () => {
    //console.log(this.props.info)
    await deleteProductById(this.props.info.pid)
    this.reRenderList()
    this.handleCloseDelete()
  }

  //Render lai cac san pham sau khi sua xoa
  reRenderList = () => {
    this.props.updateChange(this.props.sid)
  }

  onChangeInputImage = async (e) => {
    let uploadData = new FormData()
    uploadData.append('file', e.target.files[0], "file")
    let tmp = await cloudinaryUpload(uploadData)
    //console.log('Link',tmp)
    this.setState({
      details: {
        ...this.state.details,
        img: tmp.secure_url
      }
    })
  }

  render() {
    const {
      pid: id,
      img: url,
      title: name,
      price,
      quantity,
      unit,
      content,
      discount,
    } = this.props.info

    return (
      <>
        <tbody>
          <tr>
            <td>
              <img src={url} alt={name} />
            </td>
            <td>{name}</td>
            <td>Grocery</td>
            <td>Grocery Shop</td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td>
              <span>publish</span>
            </td>
            <td>
              <i
                className='far fa-trash-alt'
                onClick={() => this.deleteProducts(id)}
              ></i>{' '}
              {/* icon delete */}
              <i
                className='far fa-edit'
                onClick={() => this.editProducts(id)}
              ></i>{' '}
              {/* icon edit */}
            </td>
          </tr>
        </tbody>

        {/* Modal xử lí phần edit */}
        <Modal
          show={this.state.showEdit}
          onHide={this.handleCloseEdit}
          backdrop='static'
          keyboard={false}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='upload-img-container'>
              <div className='profile__infor-avatar'>
                <label htmlFor="avatar" className='profile__infor-avatar-title'>
                  <i className="fas fa-cloud-upload-alt avatar_upload-icon"></i>
                  <br />
                  <span className='avatar-title-bold'>UpLoad an image</span>
                  &nbsp; or drag and drop
                  <br></br>
                  <span>PNG, JPG</span>
                </label>

                <input type="file"
                  id="avatar" name="avatar"
                  accept="image/png, image/jpeg"
                  className='profile__infor-avatar-input'
                  onChange={(e) => this.onChangeInputImage(e)}
                />
              </div>
              <div className='avatar-img'>
                <img src={this.state.details.img} alt='' width="100" height="100" />
              </div>
            </div>
            <div className='gr-cate'>
              
              
              
              <div className='form-gr'>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  {/* <Form.Control
                    type='text'
                    defaultValue='Grocery'
                    disabled
                    readOnly
                  /> */}
                  <div className='item-categories-tag'>
                    {this.state.listCategory?.map((item, index) => {
                      return <span key={index}>{item.title}</span>
                    })}
                  </div>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={name}
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={unit}
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          unit: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    defaultValue={content}
                    className='description'
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          content: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={price}
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          price: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Sale Price</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={
                      discount
                    }
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          discount: e.target.value,
                        },
                      })}
                  />
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={quantity}
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          quantity: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary btn-back' onClick={this.handleClickBack}>
              Back
            </Button>
            <Button variant='success' onClick={this.handleClickUpdate}>
              Update Products
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal xử lí phần delete */}
        <Modal
          show={this.state.showDelete}
          onHide={this.handleCloseDelete}
          aria-labelledby='contained-modal-title-vcenter'
          centered
          dialogClassName='modal-delete'
        >
          <Modal.Body className='modal-body-delete'>
            <i className='far fa-trash-alt'></i>
            <h3>Delete {this.props.info['title']}</h3>
            <p>Are you sure, you want to delete?</p>
            <div className='modal-btn-delete'>
              <Button variant='success' onClick={this.handleClickCancel}>
                Cancel
              </Button>
              <Button variant='danger' onClick={this.handleClickDelete}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

