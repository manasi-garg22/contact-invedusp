import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddContact from "./components/AddContact";
import HomePage from "./components/HomePage";
import EditContact from "./components/EditContact";


function App() {
  /*---------------------------------------------
  * UseEffect method always check If the keys store in localStorage it will
  * set isLoggedIn value true in store
  -----------------------------------------------*/
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/addContact" element={<AddContact />} />
          <Route exact path="/editContact/:id" element={<EditContact />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
}

export default App;
