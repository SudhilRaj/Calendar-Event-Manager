import { createContext, useContext, useReducer, useEffect } from 'react';
import { getFromLocalStorage, hasId, saveToLocalStorage } from '../../utils';

const initialState = {
   events: [],
   isEventModalOpen: false,
   selectedDate: null,
   editMode: false,
   selectedEvent: null
};

const EventContext = createContext();

const eventReducer = (state, action) => {
   switch (action.type) {
      case 'SHOW_EVENT_MODAL':
         if(hasId(state.events, action.payload)){ // Setting editMode based on the selected date
            return { ...state, isEventModalOpen: true, selectedDate: action.payload, editMode: true };
         }
         return { ...state, isEventModalOpen: true, selectedDate: action.payload, editMode: false };
      case 'HIDE_EVENT_MODAL':
         return { ...state, isEventModalOpen: false, selectedDate: null, editMode: false };
      case 'SET_EVENTS':
         return { ...state, events: action.payload };
      case 'CREATE_EVENT':
         const newEvent = { ...action.payload, id: state.selectedDate };
         saveToLocalStorage('events', [...state.events, newEvent]);
         return {
            ...state,
            events: [...state.events, newEvent],
            isEventModalOpen: false,
            editMode: false
         };
      case 'UPDATE_EVENT':
         const updatedEvents = state.events.map((event) =>
            event.id === action.payload.id ? action.payload : event
         );
         saveToLocalStorage('events', updatedEvents);
         return {
            ...state,
            events: updatedEvents,
            selectedEvent: null,
            isEventModalOpen: false,
            editMode: false
         };
      case 'DELETE_EVENT':
         const filteredEvents = state.events.filter((event) => event.id !== action.payload);
         saveToLocalStorage('events', filteredEvents);
         return {
            ...state,
            events: filteredEvents,
            selectedEvent: null,
            isEventModalOpen: false,
            editMode: false
         };
      case 'SHOW_EVENT_DETAILS': // Can be utilized when we use separate page for edit. Currently not in use.
         return { ...state, selectedEvent: action.payload };
      default:
         return state;
   }
};
 
export const EventProvider = ({ children }) => {
   const [state, dispatch] = useReducer(eventReducer, initialState);

   useEffect(() => {
      const storedEvents = getFromLocalStorage('events');
      if (storedEvents.length) {
         dispatch({ type: 'SET_EVENTS', payload: storedEvents });
      }
   }, []);

   return (
      <EventContext.Provider value={{ state, dispatch }}>
         {children}
      </EventContext.Provider>
   );
};

export const useEventContext = () => useContext(EventContext);
