import useLocalStorage from "./useLocalStorage";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TaskList() {
  const [tasks, setTasks] = useLocalStorage({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  console.log(tasks);
  const [currentDay, setCurrentDay] = useState("");
  const [details, setDetails] = useState("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = (dayClicked, id) => {
    setDetails(tasks[dayClicked].find((task) => task.id === id));
    setShowDetails(true);
    setCurrentDay(dayClicked);
  };

  const handleSubmitDetails = (event) => {
    event.preventDefault();
    let newTasks = { ...tasks };
    let index = tasks[currentDay].findIndex((task) => task.id === details.id);
    newTasks[currentDay][index].name = event.target[0].value;
    newTasks[currentDay][index].date = event.target[1].value;
    newTasks[currentDay][index].description = event.target[2].value;
    setTasks(newTasks);
    handleCloseDetails();
  };

  const handleDelete = (dayClicked, id) => {
    let newTasks = { ...tasks };
    let index = tasks[currentDay].findIndex((task) => task.id === details.id);
    newTasks[currentDay].splice(index, 1);
    setTasks(newTasks);
    handleCloseDetails();
  };

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (dayClicked) => {
    setShowAdd(true);
    setCurrentDay(dayClicked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTasks = { ...tasks };
    newTasks[currentDay].push({
      id: Date.now(),
      name: event.target[0].value,
      date: event.target[1].value,
      description: event.target[2].value,
    });
    setTasks(newTasks);
    handleCloseAdd();
  };

  return (
    <Container>
      <Row>
        {days.map((day) => (
          <Col key={day}>
            <Card>
              <Card.Header>{day}</Card.Header>
              <ListGroup variant="flush">
                {tasks &&
                  tasks[day] &&
                  tasks[day].length > 0 &&
                  tasks[day].map((task) => (
                    <ListGroup.Item
                      key={task.id}
                      onClick={() => handleShowDetails(day, task.id)}
                    >
                      {task.name}
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => handleShowAdd(day)}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" placeholder="Enter due date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleCloseAdd}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitDetails}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" defaultValue={details.name} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" defaultValue={details.date} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={details.description}
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleCloseAdd}>
              Submit
            </Button>
            <Button variant="success" className="ms-1" onClick={handleDelete}>
              Complete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TaskList;
