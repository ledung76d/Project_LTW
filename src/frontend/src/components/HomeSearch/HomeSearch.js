import React from "react";
import "./HomeSearch.scss";

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleSearchProduct = () => {
    this.props.searchProduct(this.state.searchText);
  };

  render() {
    return (
      <div className="home-search">
        <div className="slogan-content">
          <div className="text1-title">
            <h1 className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold">
              Groceries Delivered in 90 Minute
            </h1>
          </div>
          <div className="text2-title">
            <p className="text-sm lg:text-base xl:text-lg text-heading">
              Get your healthy foods &amp; snacks delivered at your doorsteps
              all day everyday
            </p>
          </div>
          <>
            <nav className="navbar navbar-light justify-content-between fonttext">
              <div className="form-inline">
                <input
                  className="form-control mr-sm-2 "
                  type="search"
                  placeholder="Search your products from here"
                  aria-label="Search"
                  onChange={(e) =>
                    this.setState({
                      searchText: e.target.value,
                    })
                  }
                />
                <button
                  className="btn-search"
                  type="submit"
                  onClick={() => this.handleSearchProduct()}
                >
                  <i className="fas fa-search"></i>
                  <span>Search</span>
                </button>
              </div>
            </nav>
          </>
          <div className="nuller"></div>
        </div>
      </div>
    );
  }
}

export default HomeSearch;
