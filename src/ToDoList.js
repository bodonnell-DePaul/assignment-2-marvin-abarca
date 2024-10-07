// src/ToDoList.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tab, ListGroup } from 'react-bootstrap';
import todoItems from './todoItems'; // Your todoItems data file
import './index.css';

const getColorVariant = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays > 4) return 'success';
    if (diffDays > 2) return 'warning';
    return 'danger';
};

const ToDoList = () => {
    const [todos, setTodos] = useState(todoItems);
    const [newTitle, setNewTitle] = useState('');
    const [newDueDate, setNewDueDate] = useState('');

    const handleAddTodo = () => {
        if (newTitle && newDueDate) {
            const newTodo = {
                title: newTitle,
                description: 'New ToDo Description', // Default description
                dueDate: newDueDate,
            };
            setTodos([...todos, newTodo]);
            setNewTitle('');
            setNewDueDate('');
        }
    };

    return (
        <Container className="todo-list">
            <h1>Assignment 2: Marvin Abarca's ToDo List</h1>
            <Form className="add-todo-form">
                <Row>
                    <Col>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={newDueDate}
                                onChange={(e) => setNewDueDate(e.target.value)} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" className="mt-4" onClick={handleAddTodo}>Add Todo</Button>
                    </Col>
                </Row>
            </Form>

            <Tab.Container defaultActiveKey={todos[0]?.title}>
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {todos.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    eventKey={item.title}
                                    variant={getColorVariant(item.dueDate)}
                                    action
                                    href={`#${item.title}`} // Link to the corresponding Tab.Pane
                                >
                                    {item.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {todos.map((item, index) => (
                                <Tab.Pane eventKey={item.title} key={index}>
                                    <div className="tab-content">
                                        <h5>Description</h5>
                                        <div contentEditable={true} suppressContentEditableWarning={true}>
                                            {item.description}
                                        </div>
                                        <h5>Due Date</h5>
                                        <input
                                            type="date"
                                            value={item.dueDate}
                                            onChange={(e) => {
                                                const newTodos = [...todos];
                                                newTodos[index].dueDate = e.target.value;
                                                setTodos(newTodos);
                                            }}
                                        />
                                    </div>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default ToDoList;
