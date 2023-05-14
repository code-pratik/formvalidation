import {
  FORMDATA,
  DISABLE,
  GETEDITDATA,
  PAGELISTLENGTH,
  DATAOBJ,
} from "../types";

export const formReducers = (state = [], action) => {
  switch (action.type) {
    case FORMDATA:
      return action.payload;
    default:
      return state;
  }
};

// export const validationReducer = (state = validation, action) => {
//   switch (action.type) {
//     case VALIDATION:
//       return action.payload;
//     default:
//       return state;
//   }
// };

export const disableReaducer = (state = true, action) => {
  switch (action.type) {
    case DISABLE:
      return action.payload;
    default:
      return state;
  }
};

export const getEditdataReducer = (state = 0, action) => {
  switch (action.type) {
    case GETEDITDATA:
      return action.payload;
    default:
      return state;
  }
};

export const pagelistlength = (state = 5, action) => {
  switch (action.type) {
    case PAGELISTLENGTH:
      return action.payload;
    default:
      return state;
  }
};

export const editdataobj = (state = {}, action) => {
  switch (action.type) {
    case DATAOBJ:
      return action.payload;
    default:
      return state;
  }
};
