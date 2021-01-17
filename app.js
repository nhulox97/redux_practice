const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const initialBookState = {
    numOfBooks: 100
}

const initialPenState = {
    numOfPens: 50
}

const PURCHASE_BOOK = 'PURCHASE_BOOK';
const PURCHASE_PEN = 'PURCHASE_PEN';

// Action creater - An action creater is a function that returns an action.
// The below function - purchaseBook() is an action creater.

function purchaseBook() {
    return {
        type: PURCHASE_BOOK
    }
}

function purchasePen() {
    return {
        type: PURCHASE_PEN
    }
}

// We have two Reducers as shopkeepers.
const bookReducer = (state = initialBookState, action) => {
    switch(action.type) {
        case PURCHASE_BOOK: return {
            ...state,
            numOfBooks: state.numOfBooks - 1
        }
        default: return state;
    }
}

const penReducer = (state = initialPenState, action) => {
    switch(action.type) {
        case PURCHASE_PEN: return {
            ...state,
            numOfPens: state.numOfPens -1
        }
        default: return state;
    }
}

const rootReducer = combineReducers({
    book: bookReducer,
    pen: penReducer
})
// redux store holding the application state (shop owner maintaining records 
// of the books in the inventory)
const store = createStore(rootReducer);

// Shop owner checking the inventory size before opening the shop in the
// morning
console.log('Initial state - ',  store.getState());

//shop owner is ready to listen to the customers' requests (action)
const unsubscribe = store.subscribe(() => 
    console.log('Updated state - ',  store.getState())
);

store.dispatch(purchaseBook());  // First transaction (book)
store.dispatch(purchaseBook());  // Second transaction (book)
store.dispatch(purchaseBook());  // Third transaction (book)
store.dispatch(purchaseBook());  // Fourth transaction (book)

store.dispatch(purchasePen());  // First transaction (pen)
store.dispatch(purchasePen());  // Second transaction (pen)
store.dispatch(purchasePen());  // Third transaction (pen)

unsubscribe(); // shop owner close the shop (i.e unregistiring listeners).

