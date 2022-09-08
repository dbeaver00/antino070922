import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .min(3, "*Minimum length should be 3"),
    lastName: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .min(3, "*Minimum length should be 3"),
    age: yup
      .number()
      .required("*This Field is required")
      .moreThan(18, "*Age must be 18+")
      .lessThan(50, "*age must be less then 50"),
    mail: yup
      .string()
      .required("*This Field is required")
      .email("*enter a valid mail"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .length(10, "Phone number is not valid"),
    city: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .min(3, "*Minimum length should be 3"),
    state: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .min(3, "*Minimum length should be 3"),
    country: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .uppercase("*Must be in Upper case")
      .min(3, "*Minimum length should be 3"),
    pincode: yup.string().required("*This Field is required"),
    company: yup
      .string()
      .trim()
      .required("*This Field is required ")
      .min(3, "*Minimum length should be 3"),
    jobTitle: yup
      .string()
      .required("*This Field is required")
      .min(3, "*Minimum length should be 3"),
    aboutYou: yup
      .string()
      .trim()
      .required("*This Field is required")
      .min(3, "*Minimum length should be 3"),
  })
  .required();

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const notify = () =>
    toast.success("Data Send Successfully", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <div className={styles.mainDiv}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(JSON.stringify(data));
          notify();
          reset();
        })}
        className={styles.mainForm}
      >
        <input {...register("firstName")} placeholder="First name" />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <input {...register("lastName")} placeholder="Last name" />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <input {...register("age")} placeholder="Age" />
        {errors.age && <p>{errors.age.message}</p>}
        <input {...register("mail")} placeholder="Mail" />
        {errors.mail && <p>{errors.mail.message}</p>}
        <input {...register("phone")} placeholder="Phone" />
        {errors.phone && <p>{errors.phone.message}</p>}
        <div className={styles[`secondary_div`]}>
          <label htmlFor="gender">Gender</label>
          <select {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
        </div>
        <input {...register("city")} placeholder="City" />
        {errors.city && <p>{errors.city.message}</p>}
        <input {...register("state")} placeholder="State" />
        {errors.state && <p>{errors.state.message}</p>}
        <input {...register("country")} placeholder="Country" />
        {errors.country && <p>{errors.country.message}</p>}
        <input {...register("pincode")} placeholder="Pincode" />
        {errors.pincode && <p>{errors.pincode.message}</p>}
        <input {...register("company")} placeholder="Company Name" />
        {errors.company && <p>{errors.company.message}</p>}
        <input {...register("jobTitle")} placeholder="Job Title"></input>
        {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
        <textarea {...register("aboutYou")} placeholder="About You" />
        {errors.aboutYou && <p>{errors.aboutYou.message}</p>}
        <button>Submit</button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
