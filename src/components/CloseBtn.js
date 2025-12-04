import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const CloseBtn = () => {
  return (
      <div className="close-btn cursor-pointer">
          <span>&times;</span>
      </div>
  );
};

export default CloseBtn;