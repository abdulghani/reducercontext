# React Reducer Context
use reducer to provide & maintain state inside context

# Installation
npm `npm install @abdulghani/reducercontext`\
yarn `yarn add @abdulghani/reducercontext`

# Usage
Provide the reducer
```javascript
import ReducerContext from "@abdulghani/reducercontext";
import reducer from "somewhere"
import ChildrenComponent from "somewhere"

const ParentComponent = () => {
  return (
    <ReducerContext reducer={reducer}>
      <ChildrenComponent/>
    </ReducerContext>
  )
}
```

Access the state & dispatch
```javascript
import {useSelector, useDispatch, useThunk} from "@abdulghani/reducercontext";

const ChildrenComponent = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const thunk = useThunk();

  // use them
}
```