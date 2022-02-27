import React, { useEffect, useState } from "react";
import { Checkbox, Grid, TextField, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Form, Field } from "formik";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import "../AddContact/styles.css";

const EditContact = (props) => {
  const options = ["Option 1", "Option 2"];
  const [formData, setFormData] = useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const { id } = useParams();

  const handleNextClick = () => {
    console.log("clicked next");
  };

  useEffect(() => {
    let contactData = JSON.parse(localStorage.getItem("foreignAddress")) || [];
    let filtered = contactData.filter(function (value, index, arr) {
      return parseInt(id) === value.id;
    });
    setFormData(filtered[0]);
    setValue(filtered[0].type);
  }, [id]);

  const type = ["Personal", "Office"];
  return (
    <div>
      <Navbar />
      <div style={{ margin: "120px" }}>
        <h2> Edit Contact</h2>
        {formData && (
          <Formik
            initialValues={formData}
            onSubmit={(data) => {
              let arr = [];
              let contactDetails =
                JSON.parse(localStorage.getItem("foreignAddress")) || [];
              let filtered = contactDetails.filter(function (
                value,
                index,
                arr
              ) {
                return value.id !== data.id;
              });
              arr = [...filtered, data];
              localStorage.setItem("foreignAddress", JSON.stringify(arr));
              handleNextClick();
            }}
            enableReinitialize
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Field
                      component={TextField}
                      id="Name"
                      name="Name"
                      label="Name"
                      variant="outlined"
                      value={values.Name}
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
                      value={values.Number}
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
                          label={"WhatsApp"}
                          checked={values.isWhatsApp === true ? true : false}
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
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      name="type"
                      id="controllable-states-demo"
                      options={type}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <label for="file">Profile Picture</label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        let reader = new FileReader();
                        reader.onloadend = () => {
                          setFieldValue("file", reader.result);
                        };
                        reader.readAsDataURL(event.currentTarget.files[0]);
                      }}
                      className="form-control"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                <div
                  style={{
                    width: "250px",
                    marginTop: "30px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={values.Name !== "" ? false : true}
                    className="btn btn-primary"
                  >
                    Update Contact Data
                  </button>
                </div>
                </Grid>

              </Form>
            )}
          </Formik>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditContact;
