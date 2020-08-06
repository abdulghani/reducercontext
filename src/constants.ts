import { Dispatch } from "react";

export declare interface ContextShape {
  state: any;
  dispatch: Dispatch<Action>;
}

export declare interface Action {
  type: string;
  [args: string]: any;
}

export declare type ThunkAction<T> = (dispatch: Function) => Promise<T>;
