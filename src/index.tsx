import React, {
  createContext,
  Reducer,
  useMemo,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { Action, ContextShape, ThunkAction } from "./constants";

declare interface ReducerContextProps {
  reducer: Reducer<any, Action>;
  children: React.ReactElement;
  initialState?: any;
}

const context = createContext<ContextShape>({
  state: {},
  dispatch: () => ({}),
});

function ReducerContext(props: ReducerContextProps): React.ReactElement {
  const { reducer, children } = props;
  const initialState = useMemo(
    () => props.initialState ?? reducer(undefined, { type: "INIT" }),
    [reducer]
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
}

export default ReducerContext;

export function useSelector(fn: Function): any {
  const { state } = useContext(context);
  return useMemo(() => fn(state), [fn, state]);
}

export function useDispatch() {
  const { dispatch } = useContext(context);

  return useCallback(
    (action: Action | Function): any => {
      if (typeof action === "function") return action(dispatch);
      else dispatch(action);
      return;
    },
    [dispatch]
  );
}

export function useThunk() {
  const { dispatch } = useContext(context);
  return useCallback(
    <R,>(action: ThunkAction<R>): Promise<R> => action(dispatch),
    [dispatch]
  );
}
