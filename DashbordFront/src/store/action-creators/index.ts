import * as UserActionCreators from "./userActions";
import * as BlogActionCreators from "./blogActions";

export default{
    ...UserActionCreators,
    ...BlogActionCreators,
}