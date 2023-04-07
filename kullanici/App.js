import React from "react";
import UserForm from "./src/UserForm";

class App extends React.Component {
  render() {
    return (
      <form>
        <label>
          İsim:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          E-posta:
          <input type="email" name="email" />
        </label>
        <br />
        <button type="submit">Gönder</button>
      </form>
    );
  }
}

export default Form;
