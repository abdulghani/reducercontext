import React, {
  createContext,
  Reducer,
  useMemo,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { Action, ContextShape } from "./constants";

declare interface ReducerContextProps {
  reducer: Reducer<any, Action>;
  children: React.ReactElement;
  initialState?: any;
}

const context = createContext<ContextShape>({
  state: {},
  dispatch: () => ({}),
});

const ReducerContext = (props: ReducerContextProps): React.ReactElement => {
  const { reducer, children } = props;
  const initialState = useMemo(
    () => props.initialState ?? reducer(undefined, { type: "INIT" }),
    [reducer]
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

export default ReducerContext;

export const useSelector = (fn: Function): any => {
  const { state } = useContext(context);
  return useMemo(() => fn(state), [fn, state]);
};

export const useDispatch = (): ((action: Action) => void) => {
  const { dispatch } = useContext(context);
  return useCallback((action: Action) => dispatch(action), [dispatch]);
};

export const useThunk = () => {
  const { dispatch } = useContext(context);
  return <R,>(action: (dispatch: Function) => Promise<R>): Promise<R> =>
    action(dispatch);
};
