import { useState } from "react";
import { Col, Row } from "react-bootstrap"
import ButtonContainer from "./button";
import { useEventContext } from "./context/EventContext";
import { hasId } from "../utils";

const Calendar = () => {
   const { state, dispatch } = useEventContext();

   const [currentMonth, setCurrentMonth] = useState(new Date());

   // Navigate to the previous month
   const prevMonth = () => {
      setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
   };

   // Navigate to the next month
   const nextMonth = () => {
      setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
   };

   const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
      return new Date(year, month, 0).getDate(); // Get the date of the last day of the month
   };

   const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth); // Get the number of days in the month
      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const startingDayOfWeek = firstDayOfMonth.getDay(); // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      
      const calendarGrid = [];
      let currentRow = [];

      // Generate empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
         currentRow.push(
            <Col key={`empty-${i}`} className="calendar-cell empty-cell"></Col>
         );
      }
      
      // Generate cells for each day in the month
      for (let day = 1; day <= daysInMonth; day++) {
         const dateInfo = `${day} ${currentMonth.toLocaleString('default', { month: 'short' })} ${currentMonth.getFullYear()}`
         const parsedDate = new Date(dateInfo);

         currentRow.push(
            <Col key={day} className={`calendar-cell ${hasId(state.events, parsedDate.toISOString()) ? 'has-event' : ''}`} onClick={() => openEventModal(parsedDate.toISOString())}>
               {day}
            </Col>
         );

         // Check if we have added seven days (a full row)
         if (currentRow.length === 7) {
            calendarGrid.push(
               <Row key={calendarGrid.length} className="calendar-row">
                  {currentRow}
               </Row>
            );
            currentRow = []; // Reset the current row
         }
      }

       // Add the last row if it's not already complete
      if (currentRow.length > 0) {
         while (currentRow.length < 7) {
            currentRow.push(
               <Col key={`empty-${currentRow.length}`} className="calendar-cell empty-cell"></Col>
            );
         }
         calendarGrid.push(
            <Row key={calendarGrid.length} className="calendar-row">
               {currentRow}
            </Row>
         );
      }
      
      return calendarGrid;
   };

   const openEventModal = (selectedDate) => {
      dispatch({ type: 'SHOW_EVENT_MODAL', payload: selectedDate });
   };
   
   return (
      <div>
         <div className="calendar-container">
            <div className="calendar-header">
               <ButtonContainer variant="secondary" onClick={prevMonth}><i className="bi bi-chevron-left"/></ButtonContainer>
               <h4>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
               <ButtonContainer variant="secondary" onClick={nextMonth}><i className="bi bi-chevron-right"/></ButtonContainer>
            </div>
            <div className="calendar-grid">{renderCalendar()}</div>
         </div>
      </div>
   )
}

export default Calendar;