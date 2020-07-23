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
}

const context = createContext<ContextShape>({
  state: {},
  dispatch: () => ({}),
});

const ReducerContext = ({
  reducer,
  children,
}: ReducerContextProps): React.ReactElement => {
  const initialState = useMemo(() => reducer(undefined, { type: "INIT" }), [
    reducer,
  ]);
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

export const useThunk = (): ((action: Function) => void) => {
  const { dispatch } = useContext(context);
  return useCallback((action: Function) => action(dispatch), [dispatch]);
};
