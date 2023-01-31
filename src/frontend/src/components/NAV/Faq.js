import React from "react";
import "./FAQ.scss";

class Faq extends React.Component {
  state = {
    showFAQ: [
      { showFAQ1: false },
      { showFAQ2: false },
      { showFAQ3: false },
      { showFAQ4: false },
    ],
  };
  // state = {
  //     showFAQ: false
  // }
  // handleShowFAQ = () => {
  //     this.setState({
  //         showFAQ: !this.state.showFAQ
  //     })
  // }
  handleShowFAQ1 = () => {
    let { showFAQ1 } = this.state.showFAQ[0];
    this.setState({
      showFAQ: [
        { showFAQ1: !showFAQ1 },
        { showFAQ2: false },
        { showFAQ3: false },
        { showFAQ4: false },
      ],
    });
  };
  handleShowFAQ2 = () => {
    let { showFAQ2 } = this.state.showFAQ[1];
    this.setState({
      showFAQ: [
        { showFAQ1: false },
        { showFAQ2: !showFAQ2 },
        { showFAQ3: false },
        { showFAQ4: false },
      ],
    });
  };
  handleShowFAQ3 = () => {
    let { showFAQ3 } = this.state.showFAQ[2];
    this.setState({
      showFAQ: [
        { showFAQ1: false },
        { showFAQ2: false },
        { showFAQ3: !showFAQ3 },
        { showFAQ4: false },
      ],
    });
  };
  handleShowFAQ4 = () => {
    let { showFAQ4 } = this.state.showFAQ[3];
    this.setState({
      showFAQ: [
        { showFAQ1: false },
        { showFAQ2: false },
        { showFAQ3: false },
        { showFAQ4: !showFAQ4 },
      ],
    });
  };

  render() {
    // let { showFAQ } = this.state
    let { showFAQ1 } = this.state.showFAQ[0];
    let { showFAQ2 } = this.state.showFAQ[1];
    let { showFAQ3 } = this.state.showFAQ[2];
    let { showFAQ4 } = this.state.showFAQ[3];
    return (
      <>
        <div className="FAQ_Container">
          <section className="FAQ_General">
            <header>
              <h1>FAQ</h1>
            </header>
            <div className="FAQ_elements">
              {!showFAQ1 ? (
                <div
                  className="FAQ_element"
                  onClick={() => this.handleShowFAQ1()}
                >
                  <header className="FAQ_Index">
                    <h2>How to contact with Customer Service?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-plus"></i>
                    </div>
                  </header>
                </div>
              ) : (
                <div
                  className="FAQ_element FAQ_Show"
                  onClick={() => this.handleShowFAQ1()}
                >
                  <header className="FAQ_Index">
                    <h2>How to contact with Customer Service?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-minus"></i>
                    </div>
                  </header>
                  <div className="FAQ_script">
                    <p>
                      Our Customer Experience Team is available 7 days a week
                      and we offer 2 ways to get in contact.Email and Chat . We
                      try to reply quickly, so you need not to wait too long for
                      a response!.
                    </p>
                  </div>
                </div>
              )}
              {!showFAQ2 ? (
                <div
                  className="FAQ_element"
                  onClick={() => this.handleShowFAQ2()}
                >
                  <header className="FAQ_Index">
                    <h2>
                      App installation failed, how to update system information?
                    </h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-plus"></i>
                    </div>
                  </header>
                </div>
              ) : (
                <div
                  className="FAQ_element FAQ_Show"
                  onClick={() => this.handleShowFAQ2()}
                >
                  <header className="FAQ_Index">
                    <h2>
                      App installation failed, how to update system information?
                    </h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-minus"></i>
                    </div>
                  </header>
                  <div className="FAQ_script">
                    <p>
                      Please read the documentation carefully . We also have
                      some online video tutorials regarding this issue . If the
                      problem remains, Please Open a ticket in the support forum
                    </p>
                  </div>
                </div>
              )}
              {!showFAQ3 ? (
                <div
                  className="FAQ_element"
                  onClick={() => this.handleShowFAQ3()}
                >
                  <header className="FAQ_Index">
                    <h2>Website response taking time, how to improve?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-plus"></i>
                    </div>
                  </header>
                </div>
              ) : (
                <div
                  className="FAQ_element FAQ_Show"
                  onClick={() => this.handleShowFAQ3()}
                >
                  <header className="FAQ_Index">
                    <h2>Website response taking time, how to improve?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-minus"></i>
                    </div>
                  </header>
                  <div className="FAQ_script">
                    <p>
                      At first, Please check your internet connection . We also
                      have some online video tutorials regarding this issue . If
                      the problem remains, Please Open a ticket in the support
                      forum.
                    </p>
                  </div>
                </div>
              )}
              {!showFAQ4 ? (
                <div
                  className="FAQ_element"
                  onClick={() => this.handleShowFAQ4()}
                >
                  <header className="FAQ_Index">
                    <h2>How do I create a account?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-plus"></i>
                    </div>
                  </header>
                </div>
              ) : (
                <div
                  className="FAQ_element FAQ_Show"
                  onClick={() => this.handleShowFAQ4()}
                >
                  <header className="FAQ_Index">
                    <h2>How do I create a account?</h2>
                    <div className="FAQ_svg">
                      <i className="fas fa-minus"></i>
                    </div>
                  </header>
                  <div className="FAQ_script">
                    <p>
                      If you want to open an account for personal use you can do
                      it over the phone or online. Opening an account online
                      should only take a few minutes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Faq;
