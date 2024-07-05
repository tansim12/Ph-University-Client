import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <button>
        <Link to="/register">login</Link>
      </button>
    </div>
  );
};

export default Login;
