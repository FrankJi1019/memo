import React from "react";

class Header extends React.Component {

    render() {
        return (
            <div className="header ov">
                <div className="logo fl">MEMO</div>
                <div className="greeting fr">Hello, {this.props.username}</div>
            </div>
        )
    }
    
}

export default Header