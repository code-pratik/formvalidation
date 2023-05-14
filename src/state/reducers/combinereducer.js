import { combineReducers } from "redux";
import {
  // dataobjreducer,
  disableReaducer,
  editdataobj,
  formReducers,
  getEditdataReducer,
  pagelistlength,
  // validationReducer,
} from "./allreducer";

const reducers = combineReducers({
  data: formReducers,
  // dataobj: dataobjreducer,
  // validation: validationReducer,
  disable: disableReaducer,
  editdata: getEditdataReducer,
  pagelistlength: pagelistlength,
  dataobj: editdataobj,
});

export default reducers;
