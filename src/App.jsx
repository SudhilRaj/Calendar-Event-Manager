import { Col, Row } from 'react-bootstrap'
import Calendar from './components/calendar'
import Events from './components/events'
import { EventProvider } from './components/context/EventContext'
import EventFormModal from './components/eventFormModal'
import './App.css'

const App = () => {
  return (
    <EventProvider>
      <Row>
        <Col sm={12} className="mb-4 main-title">
          <h2>Calendar Event Manager</h2>
        </Col>
        <Col sm={6} md={8}>
          <Calendar/>
        </Col>
        <Col sm={6} md={4}>
          <Events/>
        </Col>
      </Row>
      <EventFormModal/>
    </EventProvider>
  )
}

export default App;
