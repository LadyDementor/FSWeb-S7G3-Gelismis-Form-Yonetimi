import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Lütfen isminizi girin"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta adresi girin"),
  age: Yup.number()
    .required("Lütfen yaşınızı girin")
    .positive("Yaşınız pozitif bir sayı olmalıdır")
    .integer("Yaşınız bir tam sayı olmalıdır"),
});

function MyForm() {
  const [users, setUsers] = useState([]);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        console.log("Form verileri doğru.");
        axios
          .post("https://reqres.in/api/users", values)
          .then((response) => {
            console.log(response.data);
            setUsers([...users, response.data]);
          })
          .catch((error) => console.log(error));
      } catch (errors) {
        console.log("Form verileri hatalı:", errors.errors);
      }
    },
  });

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            İsim:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          {touched.name && errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>
            E-posta:
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>
            Yaş:
            <input
              type="text"
              name="age"
              value={values.age}
              onChange={handleChange}
              required
            />
          </label>
          {touched.age && errors.age && <p>{errors.age}</p>}
        </div>
        <button type="submit">Gönder</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyForm;
