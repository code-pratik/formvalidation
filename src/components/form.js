import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getFormData,
  disablefun,
  editValues,
  updatedata,
} from "../state/action-creator";

function Form() {
  const dataobj = useSelector((state) => state.dataobj);
  const [formField, setFormField] = useState(dataobj);
  useEffect(() => {
    setFormField(dataobj);
  }, [dataobj]);

  const [validation, setValidation] = useState({
    errorname: "none",
    erroremail: "none",
    errorphoneno: "none",
    errorusername: "none",
  });
  const [value, setValue] = useState(0);
  const userdata = useSelector((state) => state.data);
  const editdataid = useSelector((state) => state.editdata);
  const disable = useSelector((state) => state.disable);
  const dispatch = useDispatch();
  const onchangevalidation = (user) => {
    const nameRegx = !/^[a-zA-Z]+$/.test(user.name);
    const emailRegx =
      !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
        user.email
      );
    const phoneNoRegx = !/^[0-9]{10}$/.test(+user.phoneno);
    const userNameRegx =
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*@)[a-zA-Z0-9@]{3,8}$/.test(user.username);
    if (value === 1) {
      if (userNameRegx || phoneNoRegx || nameRegx || emailRegx) {
        let obj = {};
        // console.log(user.name);
        !/^[a-zA-Z]+$/.test(user.name)
          ? (obj.errorname = "block")
          : (obj.errorname = "none");
        emailRegx ? (obj.erroremail = "block") : (obj.erroremail = "none");
        phoneNoRegx
          ? (obj.errorphoneno = "block")
          : (obj.errorphoneno = "none");
        userNameRegx
          ? (obj.errorusername = "block")
          : (obj.errorusername = "none");
        return setValidation(obj);
      } else {
        let obj = {};
        !/^[a-zA-Z]+$/.test(user.name)
          ? (obj.errorname = "block")
          : (obj.errorname = "none");
        emailRegx ? (obj.erroremail = "block") : (obj.erroremail = "none");
        phoneNoRegx
          ? (obj.errorphoneno = "block")
          : (obj.errorphoneno = "none");
        userNameRegx
          ? (obj.errorusername = "block")
          : (obj.errorusername = "none");
        return setValidation(obj);
      }
    }
  };

  const onChangeField = (event) => {
    event.stopPropagation();
    const user = {
      ...formField,
      [event.target.name]: event.target.value,
    };
    onchangevalidation(user);
    setFormField(user);
  };

  const validate = () => {
    let obj = {};
    !/^[a-zA-Z]+$/.test(formField.name)
      ? (obj.errorname = "block")
      : (obj.errorname = "none");
    !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
      formField.email
    )
      ? (obj.erroremail = "block")
      : (obj.erroremail = "none");
    !/^[0-9]{10}$/.test(+formField.phoneno)
      ? (obj.errorphoneno = "block")
      : (obj.errorphoneno = "none");
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*@)[a-zA-Z0-9@]{3,8}$/.test(formField.username)
      ? (obj.errorusername = "block")
      : (obj.errorusername = "none");
    return setValidation(obj);
    // }
  };

  const createUser = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (
      !/^[a-zA-Z]+$/.test(formField.name) ||
      !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
        formField.email
      ) ||
      !/^[0-9]{10}$/.test(+formField.phoneno) ||
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*@)[a-zA-Z0-9@]{3,8}$/.test(
        formField.username
      )
    ) {
      setValue(1);
      return validate();
    }
    setValidation({
      errorname: "none",
      erroremail: "none",
      errorphoneno: "none",
      errorusername: "none",
    });
    setValue(0);
    dispatch(getFormData(formField));
    const obj = { name: "", email: "", phoneno: "", username: "" };
    setFormField(obj);
  };

  const onClickUpdate = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (
      !/^[a-zA-Z]+$/.test(formField.name) ||
      !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
        formField.email
      ) ||
      !/^[0-9]{10}$/.test(+formField.phoneno) ||
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*@)[a-zA-Z0-9@]{3,8}$/.test(
        formField.username
      )
    ) {
      setValue(1);
      return validate();
    }
    const indexToUpdate = userdata.findIndex((item) => item.id === editdataid);
    userdata.splice(indexToUpdate, 1, {
      id: editdataid,
      ...formField,
    });
    // console.log(data);
    const obj = { name: "", email: "", phoneno: "", username: "" };
    setFormField(obj);
    dispatch(editValues(obj));
    dispatch(updatedata(userdata));
    dispatch(disablefun(true));
  };

  const { errorname, erroremail, errorphoneno, errorusername } = validation;
  return (
    <div>
      {console.log(editdataid)}
      <form onSubmit={disable ? createUser : onClickUpdate}>
        {console.log(dataobj)}
        <label>Name :</label>
        <input
          type="text"
          value={formField.name}
          name="name"
          onChange={onChangeField}
          reqired
        />
        <br />
        <p style={{ display: `${errorname}` }}>error in name</p>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formField.email}
          onChange={onChangeField}
          reqired
        />
        <br />
        <p style={{ display: `${erroremail}` }}>error in email</p>
        <label>Phone No :</label>
        <input
          type="number"
          name="phoneno"
          value={formField.phoneno}
          onChange={onChangeField}
          reqired
        />
        <br />
        <p style={{ display: `${errorphoneno}` }}>error in phoneno</p>
        <label>username :</label>
        <input
          type="text"
          name="username"
          value={formField.username}
          onChange={onChangeField}
          reqired
        />
        <br />
        <p style={{ display: `${errorusername}` }}>error in username</p>
        <input type="submit" value={disable ? "submit" : "update"} />
      </form>
    </div>
  );
}

export default Form;
