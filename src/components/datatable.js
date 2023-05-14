import { useSelector, useDispatch } from "react-redux";
import {
  disablefun,
  editValues,
  geteditdataId,
  onClickDelete,
  onSetListSize,
} from "../state/action-creator";
import { useState } from "react";

function Datatable() {
  const [users, setusers] = useState([]);
  const data = useSelector((state) => state.data);
  const [search, setSearch] = useState("");
  const userdata = search === "" ? data : users;
  const [start, setstart] = useState(0);
  const [end, setend] = useState(5);
  const [disablenext, setdisablenext] = useState(false);
  const [disableprv, setdisableprv] = useState(false);
  const listlength = useSelector((state) => state.pagelistlength);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const DeleteUser = (event, id) => {
    event.stopPropagation();
    let data = userdata.filter((items) => items.id !== id);
    dispatch(onClickDelete(data));
  };
  let array = [];
  const btns = () => {
    for (let i = 0; i < userdata.length / listlength; i++) {
      array = [...array, i];
    }
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
    const searchData = data.filter(
      (item) =>
        item.username
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) === 0 ||
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) ===
          0 ||
        item.email.toLowerCase().indexOf(event.target.value.toLowerCase()) ===
          0 ||
        item.username
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) === 0 ||
        item.phoneno.toString().indexOf(event.target.value) === 0 ||
        item.id.toString().indexOf(event.target.value) === 0
    );
    setusers(searchData);
  };

  const onclickstart = (event) => {
    setstart(event.target.value * listlength);
    setend(event.target.value * listlength + +listlength);
    console.log("start", start);
    console.log("end", end);
    if (+event.target.value === Math.floor(userdata.length / listlength)) {
      setdisablenext(true);
    } else {
      setdisablenext(false);
    }
    if (event.target.value * listlength === 0) {
      setdisableprv(true);
    } else {
      setdisableprv(false);
    }
  };
  const onClickListSize = (event) => {
    dispatch(onSetListSize(event.target.value));
    setstart(0);
    setend(+event.target.value);
    setdisableprv(true);
    setdisablenext(false);
    if (listlength < 15) {
      setdisablenext(true);
    }
  };

  const onClickNext = () => {
    setstart(start + +listlength);
    setend(end + +listlength);
    console.log(userdata.length, end, userdata.length < end + +listlength);
    if (userdata.length < end + +listlength) {
      setdisablenext(true);
    }
  };
  const onClickPrv = () => {
    setstart(start - +listlength);
    setend(end - +listlength);
    setdisablenext(false);
    if (start - +listlength === 0) {
      setdisableprv(true);
    }
  };
  const edit = (event, item) => {
    event.stopPropagation();
    const obj = {
      name: item.name,
      email: item.email,
      phoneno: item.phoneno,
      username: item.username,
    };
    dispatch(geteditdataId(item.id));
    dispatch(editValues(obj));
    dispatch(disablefun(false));
  };
  return (
    <div>
      {btns()}
      <input
        type="search"
        value={search}
        placeholder="search"
        onChange={(event) => onChangeSearch(event)}
      />
      <select onChange={(event) => onClickListSize(event)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phoneno</th>
            <th>Username</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {userdata.slice(start, end).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneno}</td>
                <td>{item.username}</td>
                <td>
                  <input
                    type="button"
                    value="Edit"
                    onClick={(event) => {
                      edit(event, item);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={(event) => {
                      DeleteUser(event, item.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
      <div>
        <input
          type="button"
          value="Next"
          disabled={disablenext}
          onClick={onClickNext}
        />
        {array.map((item) => {
          return (
            <input
              type="button"
              value={item}
              onClick={(event) => onclickstart(event)}
            />
          );
        })}
        <input
          type="button"
          value="prev"
          disabled={disableprv}
          onClick={onClickPrv}
        />
      </div>
    </div>
  );
}

export default Datatable;
