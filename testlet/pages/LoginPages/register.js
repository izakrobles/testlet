import { Formik } from "formik";
import * as Yup from "yup";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Your password is too short."),
  confirmpassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

function Register() {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "", confirmpassword: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="Register">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Register</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="confirmpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_match}
                  placeholder="Re-enter the same password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.confirmpassword &&
                    touched.confirmpassword &&
                    errors.confirmpassword}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Register</button>
                <p style={{ color: "black" }}>
                  By creating an account you agree to our{" "}
                  <a href="/LoginPages/terms" style={{ color: "blue" }}>
                    Terms & Privacy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Register;
