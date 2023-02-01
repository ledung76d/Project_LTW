import React from "react";
import "bootstrap";
import "./SideBar.scss";
import link, { links } from "./data";
import meatLogo from "../../assets/images/meat.png";
import dairyLogo from "../../assets/images/dairy.png";
import cookingLogo from "../../assets/images/cooking.png";
import breakfastLogo from "../../assets/images/breakfast.png";
import beverage from "../../assets/images/beverage.png";
import healty from "../../assets/images/healty.png";

class SideBar extends React.Component {
  handleRenderProductByCategory = (category) => {
    //console.log('Sidebar: ',category)
    this.props.changeCategory(category);
  };

  render() {
    return (
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={() =>
                this.handleRenderProductByCategory("Fruits & Vegetables")
              }
            >
              <i className="far fa-lemon"></i>
              Fruits &amp; Vegetables
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div
              className="accordion-body"
              onClick={() => this.handleRenderProductByCategory("Fruits")}
            >
              Fruits
            </div>
            <div
              className="accordion-body"
              onClick={() => this.handleRenderProductByCategory("Vegetables")}
            >
              Vegetables
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              onClick={() => this.handleRenderProductByCategory("Meat & Fish")}
            >
              <img src={meatLogo} />
              Meat &amp; Fish
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div
              className="accordion-body"
              onClick={() => this.handleRenderProductByCategory("Meat")}
            >
              Meat
            </div>
            <div
              className="accordion-body"
              onClick={() => this.handleRenderProductByCategory("Fish")}
            >
              Fish
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              onClick={() => this.handleRenderProductByCategory("Snacks")}
            >
              <i className="fas fa-coffee"></i>
              Snacks
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            {links[2].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              onClick={() => this.handleRenderProductByCategory("Pet Care")}
            >
              <i className="fas fa-paw"></i>
              Pet Care
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            {links[3].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
              onClick={() =>
                this.handleRenderProductByCategory("Home & Cleaning")
              }
            >
              <i className="fas fa-home"></i>
              Home &amp; Cleaning
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            {links[4].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
              onClick={() => this.handleRenderProductByCategory("Dairy")}
            >
              <img src={dairyLogo} />
              Dairy
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample"
          >
            {links[5].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
              onClick={() => this.handleRenderProductByCategory("Cooking")}
            >
              <img src={cookingLogo} />
              Cooking
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#accordionExample"
          >
            {links[6].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingEight">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
              onClick={() => this.handleRenderProductByCategory("Breakfast")}
            >
              <img src={breakfastLogo} />
              Breakfast
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="headingEight"
            data-bs-parent="#accordionExample"
          >
            {links[7].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingNine">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseNine"
              aria-expanded="false"
              aria-controls="collapseNine"
              onClick={() => this.handleRenderProductByCategory("Beverage")}
            >
              <img src={beverage} />
              Beverage
            </button>
          </h2>
          <div
            id="collapseNine"
            className="accordion-collapse collapse"
            aria-labelledby="headingNine"
            data-bs-parent="#accordionExample"
          >
            {links[8].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTen">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTen"
              aria-expanded="false"
              aria-controls="collapseTen"
              onClick={() =>
                this.handleRenderProductByCategory("Health & Beautiful")
              }
            >
              <img src={healty} />
              Health &amp; Beautiful
            </button>
          </h2>
          <div
            id="collapseTen"
            className="accordion-collapse collapse"
            aria-labelledby="headingTen"
            data-bs-parent="#accordionExample"
          >
            {links[9].sublinks.map((item, index) => {
              return (
                <>
                  <div
                    className="accordion-body"
                    onClick={() =>
                      this.handleRenderProductByCategory(item.text)
                    }
                  >
                    {item.text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
