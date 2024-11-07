import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface RoomCreateModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (name: string, description: string) => void;
}

const RoomCreateModal = ({ show, onHide, onSubmit }: RoomCreateModalProps) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description);
    setName('');
    setDescription('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Room</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Room Name</Form.Label>
            <Form.Control type="text" placeholder="Enter room name" value={name} onChange={e => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter room description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Room
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RoomCreateModal;
