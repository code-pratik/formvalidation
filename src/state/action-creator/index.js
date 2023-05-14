import {
  DISABLE,
  // EMAIL,
  FORMDATA,
  GETEDITDATA,
  // NAME,
  // PHONENO,
  // USERNAME,
  PAGELISTLENGTH,
  DATAOBJ,
  // VALIDATION,
} from "../types";

export const getFormData = (formField) => {
  return (dispatch, getstore) => {
    dispatch({
      type: FORMDATA,
      payload: [
        ...getstore().data,
        {
          id: new Date().getTime() + Math.round(Math.random() * 1000),
          ...formField,
        },
      ],
    });
  };
};

export const onClickDelete = (data) => {
  return {
    type: FORMDATA,
    payload: data,
  };
};
export const onSetListSize = (size) => {
  return {
    type: PAGELISTLENGTH,
    payload: size,
  };
};
export const onSearch = (data) => {
  return {
    type: FORMDATA,
    payload: data,
  };
};

// export const onClickEdit = (event, index, item) => {
//   event.stopPropagation();
//   return {
//     const obj = {
//       name: item.name,
//       email: item.email,
//       phoneno: item.phoneno,
//       username: item.username,
//     };
//     dispatch({
//       type: GETEDITDATA,
//       payload: index,
//     });
//     dispatch({
//       type: NAME || EMAIL || PHONENO || USERNAME,
//       payload: obj,
//     });
//     dispatch({
//       type: DISABLE,
//       payload: false,
//     });
//   };
// };

export const geteditdataId = (id) => {
  return {
    type: GETEDITDATA,
    payload: id,
  };
};

export const editValues = (obj) => {
  return {
    type: DATAOBJ,
    payload: obj,
  };
};

export const disablefun = (val) => {
  return {
    type: DISABLE,
    payload: val,
  };
};

export const updatedata = (data) => {
  return {
    type: FORMDATA,
    payload: data,
  };
};
