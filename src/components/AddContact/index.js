import React, { useState , useRef } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Checkbox, Grid, TextField, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik, Form, Field } from "formik";
import Footer from "../Footer";
import Navbar from "../Navbar";

import "./styles.css";

const AddContact = () => {
  const ref = useRef();
  const [displayData, setDisplayData] = useState({
    Name: "",
    Number: "",
    isWhatsApp: false,
    type: "",
    profilePicture: "",
    profilePublicUrl: "",
    id: Math.floor(Math.random() * 100),
  });
  const [uploadImage, setUploadImage] = useState("");
    const handleSubmit = (data, resetFrom) => {
    data.profilePublicUrl = displayData?.profilePublicUrl;
    let arr = [];
    let contactDetails = JSON.parse(localStorage.getItem("contactData")) || [];
    arr = [...contactDetails, data];
    localStorage.setItem("contactData", JSON.stringify(arr));
    setDisplayData({});
    ref.current.value = "";
    resetFrom();
  };

  const handleUpload = () => {
    if (uploadImage === null) return;
    const imageRef = ref(storage, `images/${uploadImage.name + v4()}`);
    uploadBytes(imageRef, uploadImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setDisplayData((state) => ({
          ...state,
          profilePublicUrl: url,
        }));
      });
    });
  };

  const type = ["Personal", "Office"];
  return (
    <div>
      <Navbar />
      <div style={{ margin: "120px" }}>
        <h2>Add Contact</h2>
        <Formik initialValues={displayData || {}}>
          {({ setFieldValue, values, resetForm }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Field
                    component={TextField}
                    name="Name"
                    label="Name"
                    value={values.Name}
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
                    type="Number"
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
                        checked={values.isWhatsApp ? true : false}
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
                  <input
                    id="file"
                    name="file"
                    type="file"
                    ref={ref}
                    onChange={(event) => {
                      event.preventDefault();
                      let reader = new FileReader();
                      setUploadImage(event.target.files[0]);
                      reader.onloadend = () => {
                        setFieldValue("file", reader.result);
                      };
                      reader.readAsDataURL(event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                </Grid>
                <button
                  type="submit"
                  style={{ width: "200px", height: "40px", marginTop: "35px" }}
                  onClick={() => handleUpload()}
                  disabled={values.Name !== "" ? false : true}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </Grid>
              <div
                style={{
                  marginLeft: "300px",
                  width: "250px",
                  marginTop: "30px",
                }}
              >
                <button
                  type="submit"
                  style={{ width: "200px" }}
                  onClick={() => handleSubmit(values, resetForm)}
                  disabled={values.Name === "" ? true : false}
                  className="btn btn-primary"
                >
                  Add Contact
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default AddContact;
