import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';

const Logout = (props) => {
    props.setLogout();
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
