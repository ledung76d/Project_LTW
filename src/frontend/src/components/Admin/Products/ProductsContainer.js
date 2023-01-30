import React, { Component } from "react";
import {
  InputGroup,
  FormControl,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./Products.scss";
import {
  handleGetProductByStoreId,
  handleGetAllCategory,
} from "../../../services/productService";
import ImageUpload from "./ImageUpload";
import ProductList from "./ProductList";
import paginate from "./utils";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Multiselect from "multiselect-react-dropdown";
import { cloudinaryUpload } from "../../../services/userService";
import adminService from "../../../services/adminService";
class ProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      showFilter: false,
      files: [],
      page: 0,
      data: [], // lưu các mảng của các page
      products: [], // lưu sản phẩm của page
      details: {
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
      },
      filterByGroup: "none",
      filterByCategory: "none",
      category: null,
      selectedValue: null,
      listCategory: null, //Dung khi them san pham

      //Them san pham
      tmpName: null,
      tmpUnit: null,
      tmpDescription: null,
      tmpPrice: null,
      tmpDiscount: null,
      tmpQuantity: null,
      tmpImg: null,

      //Fitler
      sortBy: "",
      searchCategory: "",
      textSearch: "",
    };
  }

  onChangeInputImage = async (e) => {
    let uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    let tmp = await cloudinaryUpload(uploadData);
    //console.log('Link',tmp)
    this.setState({
      tmpImg: tmp.secure_url,
    });
  };

  fetchProducts = async (sid) => {
    const response = await handleGetProductByStoreId(sid);

    this.setState({ data: paginate(response.products) });
    this.setState({ products: this.state.data[this.state.page] });
    // console.log(this.state.products)
  };

  async componentDidMount() {
    await this.fetchProducts(this.props.adminInfo.sid);
    let data = await handleGetAllCategory();
    this.setState({
      category: data,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.page !== prevState.page) {
    //   this.setState({ products: this.state.data[this.state.page] })
    // }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
  }

  addFile = async (file) => {
    console.log(file);
    this.setState({
      files: file?.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });
  };

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    });
  };

  handleCloseAddProduct = () => this.setState({ showAddProduct: false });
  handleOpenAddProduct = () => this.setState({ showAddProduct: true });

  handleClickBack = () => {
    this.setState({ details: {} });
    this.handleCloseAddProduct();
  };

  handleClickAddProduct = async () => {
    // if (this.state.files.length > 0) {
    //   this.state.details['img'] = this.state.files[0].preview
    // }
    //console.log('ID: ',nextPid.Auto_increment)
    let product = {
      ...this.state.details,
      discount: Number.parseInt(this.state.details.discount),
      price: Number.parseFloat(this.state.details.price),
      quantity: Number.parseInt(this.state.details.quantity),
      // img: this.state.tmpImg,
      img: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg",
      sid: this.props.adminInfo.sid,
    };
    console.log("Add: ", product);
    let insertedId = await adminService.handleAddNewProductByStore(product);
    for (let i = 0; i < this.state.listCategory.length; i++) {
      let temp = {
        categoryId: this.state.listCategory[i].id,
        pid: insertedId.insertId,
      };
      setTimeout(() => adminService.handleAddProductCategory(temp), 100);
    }
    //this.state.data[this.state.data.length - 1].push(this.state.details)
    setTimeout(() => this.fetchProducts(this.props.adminInfo.sid), 100);
    this.handleCloseAddProduct();
  };

  handlePage = (e) => {
    this.setState({ page: e.selected });
  };

  onSelect = (selectedList, selectedItem) => {
    //console.log('select: ',selectedList)
    this.setState({
      listCategory: selectedList,
    });
  };

  onRemove = (selectedList, removedItem) => {
    //console.log('select: ',selectedList)
  };

  searchBtnOnClick = async () => {
    let data = {
      name: this.state.textSearch,
      sid: this.props.adminInfo.sid,
      sortBy: this.state.filterByGroup,
      category: this.state.filterByCategory,
    };
    console.log(data);
    let out = await adminService.handleSearchByFilter(data);
    console.log("Out:", out);
    this.setState({
      products: out,
    });
  };

  render() {
    return (
      <>
        <section className="products-admin">
          <article className="products-search">
            <h3>Products</h3>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type product name"
                aria-label="search"
                aria-describedby="basic-addon1"
                onChange={(e) => this.setState({ textSearch: e.target.value })}
              />
            </InputGroup>
            <i
              className="fas fa-search mb-3 search"
              onClick={() => this.searchBtnOnClick()}
            ></i>{" "}
            {/* kính lúp */}
            <Button variant="success" onClick={this.handleOpenAddProduct}>
              <i className="fas fa-plus plus"></i> Add Product
            </Button>
            <div
              className={`filter ${this.state.showFilter && "filter-active"}`}
              onClick={() =>
                this.setState({ showFilter: !this.state.showFilter })
              }
            >
              <h5>Filter</h5>
              <i className="fas fa-arrow-down"></i>
            </div>
          </article>
          {this.state.showFilter && (
            <article className="products-filter">
              <div className="filter-group">
                <h4>Filter By Group</h4>
                <Form.Select
                  aria-label="select group"
                  onChange={(e) =>
                    this.setState({ filterByGroup: e.target.value })
                  }
                >
                  <option value="none">- Sort by -</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="discount">Discount</option>
                  <option value="quantity">Quantity</option>
                </Form.Select>
              </div>
              <div className="filter-category">
                <h4>Filter By Category</h4>
                <Form.Select
                  aria-label="select category"
                  onChange={(e) =>
                    this.setState({ filterByCategory: e.target.value })
                  }
                >
                  <option value="none">- Select a category -</option>
                  {this.state.category?.map((item) => {
                    return <option value={item.title}>{item.title}</option>;
                  })}
                </Form.Select>
              </div>
            </article>
          )}

          <article className="products-table">
            <Table responsive borderless className="table-list">
              <thead>
                <tr>
                  <th className="th-img">Image</th>
                  <th className="th-name">Name</th>
                  <th>Group</th>
                  <th>Shop</th>
                  <th>Price/Unit</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {this.state.products?.map((product) => (
                <ProductList
                  key={uuidv4()}
                  info={product}
                  state={this.state}
                  sid={this.props.adminInfo.sid}
                  updateChange={this.fetchProducts}
                />
              ))}
            </Table>
          </article>
          <div className="products-pagination">
            <ReactPaginate
              nextLabel=">"
              onPageChange={this.handlePage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={this.state.data.length}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />{" "}
            {/* thanh pagination chuyển page */}
          </div>
        </section>

        {/* Them san pham */}
        <Modal
          show={this.state.showAddProduct}
          onHide={this.handleCloseAddProduct}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Product
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
                <img src={this.state.tmpImg} alt="" width="100" height="100" />
              </div>
            </div>

            <div className="gr-cate">
              <div className="form-gr">
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  {/* <Form.Control
                    type='text'
                    defaultValue='Grocery'
                    disabled
                    readOnly
                  /> */}
                  <Multiselect
                    options={this.state?.category} // Options to display in the dropdown
                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="title" // Property name to display in the dropdown options
                    placeholder="Select product category"
                  />
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={""}
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
                    defaultValue={""}
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
                    defaultValue={""}
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
                    defaultValue={""}
                    onChange={(e) =>
                      this.setState({
                        details: {
                          ...this.state.details,
                          price: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={""}
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
                    defaultValue={""}
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
            <Button variant="success" onClick={this.handleClickAddProduct}>
              Add Products
            </Button>
          </Modal.Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
