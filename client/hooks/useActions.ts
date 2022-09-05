import { bindActionCreators } from "redux";
import {useDispatch} from "react-redux";
import ActionCreators from "../store/actions-creators";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch)
}