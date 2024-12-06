import { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, InputGroup, Alert, Modal } from 'react-bootstrap';

function Comments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editPassword, setEditPassword] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://6706138a031fd46a8311db2c.mockapi.io/api/v1/Comments?gameId=${gameId}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setComments(data);
          } else {
            setComments([]);
          }
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Error fetching comments. Please try again later.');
      }
    };

    fetchComments();
  }, [gameId]);

  const addComment = async () => {
    if (!newComment || !author || !password) {
      setError('Please fill in all fields to add a comment.');
      return;
    }

    const newCommentData = {
      gameId,
      author,
      content: newComment,
      password,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://6706138a031fd46a8311db2c.mockapi.io/api/v1/Comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommentData),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments((prevComments) => [...prevComments, createdComment]);
        setNewComment('');
        setAuthor('');
        setPassword('');
        setSuccess('Comment added successfully!');
        setError('');
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error adding comment. Please try again.');
    }
  };

  const handleDeleteClick = (id, commentPassword) => {
    setCommentToDelete({ id, commentPassword });
    setShowDeleteModal(true);
  };

  const deleteComment = async () => {
    if (deletePassword !== commentToDelete.commentPassword) {
      alert('Incorrect password!');
      return;
    }

    try {
      const response = await fetch(`https://6706138a031fd46a8311db2c.mockapi.io/api/v1/Comments/${commentToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentToDelete.id));
        setDeletePassword('');
        setShowDeleteModal(false);
        setSuccess('Comment deleted successfully!');
        setError('');
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Error deleting comment. Please try again.');
    }
  };

  const handleEditClick = (id, commentPassword, content) => {
    setCommentToEdit({ id, commentPassword });
    setEditContent(content);
    setShowEditModal(true);
  };

  const editComment = async () => {
    if (editPassword !== commentToEdit.commentPassword) {
      alert('Incorrect password!');
      return;
    }

    try {
      const response = await fetch(`https://6706138a031fd46a8311db2c.mockapi.io/api/v1/Comments/${commentToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentToEdit.id ? { ...comment, content: editContent } : comment
          )
        );
        setEditPassword('');
        setEditContent('');
        setShowEditModal(false);
        setSuccess('Comment edited successfully!');
        setError('');
      } else {
        throw new Error('Failed to edit comment');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
      setError('Error editing comment. Please try again.');
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header as="h5">Comments</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form>
          <InputGroup className="mb-3">
            <Form.Control type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control as="textarea" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          </InputGroup>
          <Form.Control type="password" placeholder="Enter password (required to delete/edit)" className="mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="primary" onClick={addComment}>
            Add Comment
          </Button>
        </Form>
      </Card.Body>

      <ListGroup variant="flush">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <strong>{comment.author}</strong>: <p>{comment.content}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteClick(comment.id, comment.password)}
            >
              Delete
            </Button>{' '}
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleEditClick(comment.id, comment.password, comment.content)}
            >
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="password"
              placeholder="Enter password to delete comment"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            <Button variant="danger" className="mt-2" onClick={deleteComment}>
              Confirm Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="password"
              placeholder="Enter password to edit comment"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <Form.Control
              as="textarea"
              className="mt-2"
              placeholder="Edit your comment"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <Button variant="warning" className="mt-2" onClick={editComment}>
              Confirm Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default Comments;