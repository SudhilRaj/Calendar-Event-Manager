import { useEffect, useState } from 'react';
import ButtonContainer from './button';
import { Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { useEventContext } from './context/EventContext';
import { currentItem, formatDate2 } from '../utils';

const EventFormModal = () => {
   const { state, dispatch } = useEventContext();
   const { selectedDate, editMode, events } = state;

   const [eventData, setEventData] = useState({
      eventDate: "",
      eventName: "",
      eventType: "",
      eventDescription: ""
   });

   const patchData = () => {
      const currentElem = currentItem(events, selectedDate);
      if(currentElem){
         setEventData({
            eventDate: currentElem?.date,
            eventName: currentElem?.name,
            eventType: currentElem?.type,
            eventDescription: currentElem?.description
         })
      }
   }

   useEffect(() => {
      patchData(); // To populate the form on edit mode
   }, [editMode])

   const setInput = (e) => {
      const { name, value } = e.target;
      setEventData({
         ...eventData,
         [name]: value,
      });
	};

   const resetEventData = () => {
      setEventData({
         eventDate: "",
         eventName: "",
         eventType: "",
         eventDescription: ""
      })
   }

   const handleSaveEvent = (e, eventData) => {
      e.preventDefault();
      dispatch({
         type: 'CREATE_EVENT',
         payload: {
            date: eventData?.eventDate || state?.selectedDate,
            name: eventData.eventName,
            type: eventData.eventType,
            description: eventData.eventDescription,
         },
      });
      resetEventData();
   };

   const handleUpdateEvent = (e, eventData) => {
      e.preventDefault();
      dispatch({
         type: 'UPDATE_EVENT',
         payload: {
            id: state?.selectedDate,
            date: eventData?.eventDate || state?.selectedDate,
            name: eventData.eventName,
            type: eventData.eventType,
            description: eventData.eventDescription,
         },
      });
      resetEventData();
   }

   const handleDeleteEvent = (e) => {
      e.preventDefault();
      dispatch({
         type: 'DELETE_EVENT',
         payload: state?.selectedDate
      });
      resetEventData();
   }

   const handleCloseModal = () => {
      dispatch({ type: 'HIDE_EVENT_MODAL' });
      resetEventData();
   };

   return (
      <Modal 
         centered
         show={state.isEventModalOpen}
         onHide={handleCloseModal}
         dialogClassName="modal-90w"
         aria-labelledby="add-update-event-modal-title"
      >
         <Modal.Header closeButton>
            <Modal.Title id="add-update-event-modal-title">
               {`${editMode ? `Update Event for ${formatDate2(state?.selectedDate)}` : `Create Event for ${formatDate2(state?.selectedDate)}`}`}
            </Modal.Title>
         </Modal.Header>
         <Form onSubmit={editMode ? (e) => handleUpdateEvent(e, eventData) : (e) => handleSaveEvent(e, eventData)}>
            <Modal.Body>
               <Container fluid className="p-0">
                  <Row>
                     <Col xl={12}>
                        <Form.Group
                           className="mb-3"
                           controlId="event-name"
                        >
                           <Form.Label>Event Name</Form.Label>
                           <Form.Control
                              type="text"
                              name="eventName"
                              value={eventData.eventName}
                              onChange={(e) => setInput(e)}
                              required
                              maxLength="90"
                           />
                        </Form.Group>
                     </Col>
                     <Col xl={12}>
                        <Form.Group
                           className="mb-3"
                           controlId="event-type"
                        >
                           <Form.Label>Event Type</Form.Label>
                           <Form.Select
                              name="eventType"
                              value={eventData.eventType ? eventData.eventType : ""}
                              onChange={(e) => setInput(e)}
                              required
                           >
                              <option value="">Select Event Type</option>
                              <option value="meetings">Meetings</option>
                              <option value="reminders">Reminders</option>
                              <option value="birthdays">Birthdays</option>
                              <option value="tasks">Tasks</option>
                           </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col xl={12}>
                        <Form.Group
                           controlId="event-description"
                           className="mb-1"
                        >
                           <Form.Label>Event Description</Form.Label>
                           <Form.Control
                              as="textarea"
                              name="eventDescription"
                              value={eventData.eventDescription}
                              onChange={(e) => setInput(e)}
                              aria-describedby="event-description"
                              rows={4}
                              cols={90}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
               </Container>
            </Modal.Body>
            <Modal.Footer>
               {editMode ? (
                  <>
                  <ButtonContainer type="submit">Save</ButtonContainer>
                  <ButtonContainer
                     variant="secondary"
                     className="ms-2"
                     onClick={handleCloseModal}
                  >
                     Cancel
                  </ButtonContainer>
                  <ButtonContainer
                     variant="danger"
                     className="ms-2"
                     onClick={handleDeleteEvent}
                  >
                     Delete
                  </ButtonContainer>
                  </>
               ) : (
                  <>
                  <ButtonContainer type="submit">Create</ButtonContainer>
                  <ButtonContainer
                     variant="secondary"
                     className="ms-2"
                     onClick={handleCloseModal}
                  >
                     Cancel
                  </ButtonContainer>
                  </>
               )}
            </Modal.Footer>
         </Form>
      </Modal>
   );
}

export default EventFormModal;
