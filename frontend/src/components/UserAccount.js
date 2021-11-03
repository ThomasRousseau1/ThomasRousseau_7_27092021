import React, { useState } from "react";
import "../styles/UserAccount.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTrash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { regExpNames, regExpEmail } from "../utils/Regex.js";
import axios from "axios";

function UserAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userAttachement = localStorage.getItem("userAttachement");
  // console.log(user.attachement)
  const [attachement, modifyAttachement] = useState(null);
  const [firstName, modifyFirstName] = useState("");
  const [lastName, modifyLastName] = useState("");
  const [email, modifyEmail] = useState("");

  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  function formValidation() {
    let validation = true;
    //Validation firstName
    if (firstName) {
      if (!regExpNames.test(firstName)) {
        setInvalidFirstName(true);
        validation = false;
      } else {
        setInvalidFirstName(false);
      }
    }

    //Validation lastName
    if (lastName) {
      if (!regExpNames.test(lastName)) {
        setInvalidLastName(true);
        validation = false;
      } else {
        setInvalidLastName(false);
      }
    }

    //Validation email
    if (email) {
      if (!regExpEmail.test(email)) {
        setInvalidEmail(true);
        validation = false;
      } else {
        setInvalidEmail(false);
      }
    }
    return validation;
  }

  const modifyAccount = (e, id) => {
    const validation = formValidation();
    e.preventDefault();
    if (validation) {
      let formData = new FormData();
      formData.append("attachement", attachement);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      const data = {
        attachement: attachement ? userAttachement : user.attachement,
        firstName: firstName ? firstName : user.firstName,
        lastName: lastName ? lastName : user.lastName,
        email: email ? email : user.email,
      };
      axios({
        method: "put",
        url: `http://localhost:3000/api/users/${id}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("userAttachement", attachement);
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  };

  // fetch('http://localhost:3000/api/users/' + id, {
  //     method: 'PUT',
  //     body: JSON.stringify(data),
  //     headers: {
  //         Authorization:'Bearer '+localStorage.getItem('token'),
  //         'Content-Type': 'multipart/form-data'
  //     },
  //     })
  //     .then(res => res.json())
  //     .then(
  //         (res) => {
  //             console.log(res)
  //             localStorage.setItem('user', JSON.stringify(data))
  //         })
  //     .then(() => {
  //             window.location.href = "/home";
  //         })
  //     .catch( (error) => {
  //         alert(error)
  //         console.log(error)
  //     })
  // }

  const deleteAccount = (e, id) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.location.href = "/signup";
      })
      .catch((err) => {
        console.log(err);
        window.alert("Suppression du compte impossible !");
      });
  };

  return (
    <div className="App-connect">
      <form className="form" onSubmit={(e) => modifyAccount(e, user.id)}>
        {/* {attachement ? attachement === undefined : } */}
        {attachement ? (
          <img
            src={userAttachement}
            className="profile-img"
            alt="Votre avatar"
          />
        ) : (
          <img
            src={user.attachement}
            className="profile-img"
            alt="Votre avatar"
          />
        )}
        {/* <img src={user.attachement} value={user.attachement} className="profile-img" alt="Votre avatar"/>
            <img src={userAttachement} value={userAttachement} className="profile-img" alt="Votre avatar"/> */}
        <input
          type="file"
          name="attachement"
          className="input-file"
          onChange={(e) => {
            modifyAttachement(e.target.files[0]);
          }}
        />
        <label className="file-cover">
          <FontAwesomeIcon
            icon={faImage}
            className="file-icon"
          ></FontAwesomeIcon>
        </label>
        {attachement && (
          <div className="postimg-container">
            <img
              className="post-img"
              alt=""
              src={URL.createObjectURL(attachement)}
            />
            <button
              onClick={() => modifyAttachement(null)}
              className="delete-img"
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="deleteimg-icon"
              ></FontAwesomeIcon>
            </button>
          </div>
        )}
        <h1 className="user-title">Vos informations</h1>
        Votre prénom :
        <input
          type="text"
          className="input"
          placeholder={user["firstName"]}
          id="firstName"
          value={firstName}
          onChange={(e) => modifyFirstName(e.target.value)}
        ></input>
        {invalidFirstName && (
          <p className="signup-invalid">
            Veuillez uniquement utiliser des lettres et non des chiffres
          </p>
        )}
        Votre nom :
        <input
          type="text"
          className="input"
          placeholder={user["lastName"]}
          id="lastName"
          value={lastName}
          onChange={(e) => modifyLastName(e.target.value)}
        ></input>
        {invalidLastName && (
          <p className="signup-invalid">
            Veuillez uniquement utiliser des lettres et non des chiffres
          </p>
        )}
        Votre email :
        <input
          type="email"
          placeholder="toto123@gmail.com"
          className="input"
          placeholder={user["email"]}
          id="email"
          value={email}
          onChange={(e) => modifyEmail(e.target.value)}
        ></input>
        {invalidEmail && (
          <p className="signup-invalid">Veuillez entrer un email valide</p>
        )}
        <button
          className="login-button"
          onClick={(e) => modifyAccount(e, user.id)}
        >
          Enregistrer
        </button>
        <Link to="/signup">
          <button
            onClick={(e) => deleteAccount(e, user.id)}
            className="delete-user"
          >
            Supprimer le compte{" "}
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </Link>
      </form>
    </div>
  );
}

export default UserAccount;