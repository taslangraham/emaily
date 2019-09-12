import React, { Component } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Payments from './Payments'
class Header extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with google</a>
          </li>
        );
      default:
        const list = [
          <li key={1} > <Payments /></li >,
          <li key={3} style={{ margin: '0 10px' }}> Credits: {this.props.auth.credits}</li >,
          <li key={2}><a href="api/logout">logout</a></li>
        ];
        return list;
    }
  }
  render() {
    return (
      < div className="row" >
        <div className="col s12">
          <nav>
            <div className="nav-wrapper light-green darken-3">

              <Link
                className="brand-logo left"
                to={this.props.auth ? "/surveys" : "/"}
              >
                Emaily
              </Link>

              <ul id="nav-mobile" className="right ">
                {this.renderContent()}
                {/*  <li>
                  <a href="/auth/google">Login with google</a>
                </li>
                */}
              </ul>
            </div>
          </nav>
        </div>
      </div >
    );
  }
}

function mapSateToProps({ auth }) {
  return { auth };
}

export default connect(mapSateToProps)(Header);
