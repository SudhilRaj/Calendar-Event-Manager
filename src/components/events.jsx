import { ListGroup } from "react-bootstrap"
import ButtonContainer from "./button";
import { useEventContext } from "./context/EventContext";
import { formatDate2 } from "../utils";

const Events = () => {
   const { state, dispatch } = useEventContext();

   const handleEventUpdate = (event) => {
      // We can reuse the same modal used for add-event with edit mode
      dispatch({ type: 'SHOW_EVENT_MODAL', payload: event.id });
      // dispatch({ type: 'SHOW_EVENT_DETAILS', payload: event });
   };

   return (
      <div className="calendar-items-wrapper">
         <h4>My Calendar Items</h4>
         <ListGroup>
            {!!state.events.length ? state.events.map((event) => (
               <ListGroup.Item key={event.id}>
                  <div className="d-flex align-items-center justify-content-between">
                     <div>
                        <span className="me-4"><small>{formatDate2(event.date)}</small></span>
                        <span>{event.name}</span>
                     </div>
                     <ButtonContainer variant="secondary" onClick={() => handleEventUpdate(event)}><i className="bi bi-chevron-right"/></ButtonContainer>
                  </div>
               </ListGroup.Item>
            )) : <span>No events created yet.</span>}
         </ListGroup>
      </div>
   )
}

export default Events;