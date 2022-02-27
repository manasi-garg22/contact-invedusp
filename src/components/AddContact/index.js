import React, {  useState } from "react";
import { Checkbox, Grid, TextField, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Form, Field } from "formik";
import Footer from '../Footer';
import Navbar from "../Navbar";

import "./styles.css";

const AddContact = (props) => {
  const [displayData, setDisplayData] = useState(
 {   Name: "",
  Number: "",
  isWhatsApp: false,
  type: "",
  profilePicture: "",
  id: Math.floor(Math.random() * 100)});



  const handleSubmit= (data, resetFrom) => {
    let arr = [];
    let contactDetails =
      JSON.parse(localStorage.getItem("foreignAddress")) || [];
    arr = [...contactDetails, data];
    console.log("Array", arr);
    localStorage.setItem("foreignAddress", JSON.stringify(arr));
    setDisplayData({});
    resetFrom();
  }
  const type = ["Personal", "Office"];
  return (
    <div>
      <Navbar />
      <div style ={{margin: '120px'}}>
        <h2>Add Contact</h2>
      <Formik
        initialValues={displayData || {}}
      >
        {({ setFieldValue, values , resetForm}) => (

          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Field
                  component={TextField}
                  name="Name"
                  label="Name"
                  value = {values.Name}
                  variant="outlined"
                  onChange={(e, value) => {
                    setFieldValue("Name", e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Field
                  component={TextField}
                  name="Number"
                  label="Number"
                  type = "Number"
                  value = {values.Number}
                  variant="outlined"
                  onChange={(e, value) => {
                    setFieldValue("Number", e.target.value);
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <FormControlLabel
                  control={
                    <Field
                      component={Checkbox}
                      name="isWhatsApp"
                      variant="outlined"
                      checked = {values.isWhatsApp ? true : false}
                      label={"WhatsApp"}
                      onChange={(e, value) => {
                        setFieldValue("isWhatsApp", e.target.checked);
                      }}
                      fullWidth
                    />
                  }
                  label="Whats App"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Autocomplete
                  id="foreigntype"
                  className="type-select"
                  name="type"
                  options={type}
                  getOptionLabel={(option) => option}
                  value={values.type}
                  onChange={(e, value) => {
                    setFieldValue("type", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="type"
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={8}>
              <label for="file">Profile Picture</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                     let reader = new FileReader();
                     reader.onloadend = () => {
                      setFieldValue("file", reader.result);
                     };
                     reader.readAsDataURL(event.currentTarget.files[0]);
                  }} className="form-control" />
              </Grid>
            </Grid>
            <div style = {{marginLeft: "300px", width :"250px", marginTop: "30px"}} >
              <button
                type="submit"
                style = {{width : "200px"}}
                onClick= {() => handleSubmit(values, resetForm)}
                disabled={values.Name != "" ? false : true}
                className="btn btn-primary"
              >
                Add Contact
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      <Footer/>
    </div>
  );
};

export default AddContact;
