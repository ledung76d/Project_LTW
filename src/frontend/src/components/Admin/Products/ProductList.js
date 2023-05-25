import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import { v4 as uuidv4 } from "uuid";
import {
  deleteProductById,
  restoreProductById,
  handleGetCategoryById,
  handleGetAllCategory,
} from "../../../services/productService";
import { cloudinaryUpload } from "../../../services/userService";
import Multiselect from "multiselect-react-dropdown";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import adminService from "../../../services/adminService";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], // lưu props của ảnh
      showEdit: false, // hiện ẩn modal edit
      showDelete: false, // hiện ẩn modal edit
      details: { ...this.props.info }, // lưu các props của 1 sản phẩm
      listCategory: this.props.info.category, // lưu danh sách category của 1 sản phẩm
      category: this.props.category,
    };
  }

  async componentDidMount() {
    //console.log(data.category)
    this.setState({
      listCategory: this.props.info.category,
      category: this.props.category,
    });
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  addFile = (file) => {
    // console.log(file);
    this.setState({
      files: file.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });
  };

  handleCloseEdit = () => this.setState({ showEdit: false });
  handleOpenEdit = () => this.setState({ showEdit: true });

  handleCloseDelete = () => this.setState({ showDelete: false });
  handleOpenDelete = () => this.setState({ showDelete: true });

  deleteProducts = (id) => {
    this.handleOpenDelete();
    //console.log(id)
  };

  restoreProducts = async (id) => {
    await restoreProductById(id);
    this.reRenderList();
  };

  editProducts = (id) => {
    this.handleOpenEdit();
    // console.log(id);
  };

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    });
  };

  onSelect = (selectedList, selectedItem) => {
    //console.log('select: ',selectedList)
    this.setState({
      listCategory: selectedList,
    });
  };

  onRemove = (selectedList, removedItem) => {
    //console.log('select: ',selectedList
    this.setState({
      listCategory: selectedList,
    });
  };

  handleClickBack = () => {
    this.setState({ details: {} });
    this.handleCloseEdit();
  };

  handleClickUpdate = async () => {
    let product = {
      ...this.state.details,
      discount: Number.parseInt(this.state.details.discount),
      price: Number.parseFloat(this.state.details.price),
      quantity: Number.parseInt(this.state.details.quantity),
      category: this.state.listCategory,
      pid: this.props.info.pid,
    };
    const toastError = (message) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    if (!product.title || product.title === "") {
      toastError("Name is required");
      return;
    }
    if (!product.unit || product.unit === "") {
      toastError("Unit is required");
      return;
    }
    if (!product.content || product.content === "") {
      toastError("Description is required");
      return;
    }
    if (!product.price || product.price === "") {
      toastError("Price is required");
      return;
    }
    if (!product.discount || product.discount === "") {
      toastError("Discount is required");
      return;
    }
    if (!product.quantity || product.quantity === "") {
      toastError("Quantity is required");
      return;
    }
    if (!product.img || product.img === "") {
      toastError("Image is required");
      return;
    }
    if (product.discount < 0 || product.discount > 100) {
      toastError("Discount must be in range [0, 100]");
      return;
    }
    if (product.quantity < 0 || product.quantity > 1000000000) {
      toastError("Quantity must be greater than 0");
      return;
    }
    if (product.price < 0 || product.price > 1000000000) {
      toastError("Price must be greater than 0");
      return;
    }
    if (product.category.length === 0) {
      toastError("Category is required");
      return;
    }
    // Regex for checking the fields
    const nameRegex = /^[a-zA-Z0-9 ]{2,30}$/;
    const unitRegex = /^[a-zA-Z0-9 ]{2,10}$/;
    const descriptionRegex = /^[a-zA-Z0-9 ]{2,50}$/;
    const priceRegex = /^[0-9]{1,10}$/;
    const discountRegex = /^[0-9]{1,3}$/;
    const quantityRegex = /^[0-9]{1,10}$/;

    if (!nameRegex.test(product.title)) {
      toastError("Name must be 2-30 characters");
      return;
    }
    if (!unitRegex.test(product.unit)) {
      toastError("Unit must be 2-10 characters");
      return;
    }
    if (!descriptionRegex.test(product.content)) {
      toastError("Description must be 2-50 characters");
      return;
    }
    if (!priceRegex.test(product.price)) {
      toastError("Price must be 1-10 digits");
      return;
    }
    if (!discountRegex.test(product.discount)) {
      toastError("Discount must be 1-3 digits");
      return;
    }
    if (!quantityRegex.test(product.quantity)) {
      toastError("Quantity must be 1-10 digits");
      return;
    }

    await adminService.handleUpdateProductByStore(product);
    this.reRenderList();
    this.handleCloseEdit();
  };

  handleClickCancel = () => {
    this.handleCloseDelete();
  };

  handleClickDelete = async () => {
    //console.log(this.props.info)
    await deleteProductById(this.props.info.pid);
    this.reRenderList();
    this.handleCloseDelete();
  };

  //Render lai cac san pham sau khi sua xoa
  reRenderList = () => {
    // console.log("Rerendering");
    this.props.updateChange(this.props.sid);
  };

  onChangeInputImage = async (e) => {
    const cloudinaryEnv = {
      cloud_name: "dm6vzyxzh",
      upload_preset: "hpaflvm3",
    };
    let formData = new FormData();
    formData.append("file", e.target.files[0], "file");
    formData.append("upload_preset", cloudinaryEnv.upload_preset);

    Axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryEnv.cloud_name}/image/upload`,
      formData
    ).then((res) => {
      this.setState({
        details: {
          ...this.state.details,
          img: res.data.secure_url,
        },
      });
    });

    //console.log('Link',tmp)
    this.setState({
      details: {
        ...this.state.details,
        img: tmp.secure_url,
      },
    });
  };

  render() {
    let admin = this.props.adminInfo;
    const {
      pid: id,
      img: url,
      title: name,
      price,
      quantity,
      unit,
      content,
      discount,
      status,
    } = this.props.info;
    let categoryString = "";
    if (this.state.listCategory) {
      this.state.listCategory.forEach((item) => {
        categoryString += item.title + ", ";
      });
    }
    categoryString = categoryString.slice(0, categoryString.length - 2);
    const categoryArray = this.state.listCategory;
    // console.log(categoryArray);

    return (
      <>
        <tbody>
          <tr>
            <td>
              <img src={url} alt={name} />
            </td>
            <td>{name}</td>
            <td>{categoryString}</td>
            <td>{admin.storeName}</td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td>
              <span
                className={status === "active" ? "active-bg" : "deleted-bg"}
              >
                {status}
              </span>
            </td>
            <td>
              {status === "active" ? (
                <i
                className="far fa-trash-alt"
                onClick={() => this.deleteProducts(id)}
              ></i>) : (
                <i
                className="fa fa-recycle"
                onClick={() => this.restoreProducts(id)}
              ></i>
              )}
              <i
                className="far fa-edit"
                onClick={() => this.editProducts(id)}
              ></i>
            </td>
          </tr>
        </tbody>

        {/* Modal xử lí phần edit */}
        <Modal
          show={this.state.showEdit}
          onHide={this.handleCloseEdit}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="upload-img-container">
              <div className="profile__infor-avatar">
                <label htmlFor="avatar" className="profile__infor-avatar-title">
                  <i className="fas fa-cloud-upload-alt avatar_upload-icon"></i>
                  <br />
                  <span className="avatar-title-bold">UpLoad an image</span>
                  &nbsp; or drag and drop
                  <br></br>
                  <span>PNG, JPG</span>
                </label>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  className="profile__infor-avatar-input"
                  onChange={(e) => this.onChangeInputImage(e)}
                />
              </div>
              <div className="avatar-img">
                <img
                  src={this.state.details.img}
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="gr-cate">
              <div className="form-gr">
              <Form.Group>
                  {this.state.category && (
                      <>
                      <Form.Label>Category</Form.Label>
                      <Multiselect
                        options={this.state?.category} // Options to display in the dropdown
                        selectedValues={categoryArray} // Preselected value to persist in dropdown
                        onSelect={this.onSelect} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="title" // Property name to display in the dropdown options
                        placeholder="Select product category"
                      />
                    </>
                  )}
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
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
                    type="text"
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
                    as="textarea"
                    defaultValue={content}
                    className="description"
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
                    type="text"
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
                    type="text"
                    defaultValue={discount}
                    onChange={(e) =>
                      this.setState({
                        details: {  
                          ...this.state.details,
                          discount: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
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
            <Button variant="secondary btn-back" onClick={this.handleClickBack}>
              Back
            </Button>
            <Button variant="success" onClick={this.handleClickUpdate}>
              Update Products
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal xử lí phần delete */}
        <Modal
          show={this.state.showDelete}
          onHide={this.handleCloseDelete}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="modal-delete"
        >
          <Modal.Body className="modal-body-delete">
            <i className="far fa-trash-alt"></i>
            <h3>Delete {this.props.info["title"]}</h3>
            <p>Are you sure, you want to delete?</p>
            <div className="modal-btn-delete">
              <Button variant="success" onClick={this.handleClickCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={this.handleClickDelete}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
