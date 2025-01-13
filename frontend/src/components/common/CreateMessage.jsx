import React from "react";
import PropTypes from "prop-types";

const CreateMessage = ({ message }) => {
  const messageStyle = {
    color: "green",
    fontSize: "1rem",
    marginTop: "1rem",
  };

  return <p style={messageStyle}>{message}</p>;
};

CreateMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default CreateMessage;
