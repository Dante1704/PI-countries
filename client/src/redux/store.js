import { createStore, applyMiddleware, compose } from "redux"; //el Middleware se va a encargar de la request al server ya que el reducer no puede ocuparse de eso
import rootReducer from "./reducer";
import thunk from "redux-thunk";


//creo el store


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
