import React, { Component } from 'react';
import { connect } from 'react-redux'

// Need to hook up header to redux store and check auth state
class Header extends Component {
    // Helper method 
    renderContent() {
        switch (this.props.auth) {
            // don't know if user is auth 
            case null:
                return;
            // not auth 
            case false: 
                return <li><a href="/auth/google"> Login With Google</a></li>;
            // auth    
            default: 
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

// We want the auth state specifically 
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);