import { useLocation } from 'react-router-dom';
import { Row, Col, Container, Card, ListGroup } from 'react-bootstrap';
import './GameDetail.css';
import Comments from '../components/comments.jsx';

function GameDetail() {
  const location = useLocation();
  const { game } = location.state || {};

  if (!game) {
    return <p>No game information provided</p>;
  }

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col lg={8} md={7} sm={12} className="mb-4 mb-md-0">
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${game.trailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
          <Col lg={4} md={5} sm={12}>
            <Card>
              <Card.Header as="h5">{game.title}</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Release Date:</strong> {game.releaseDate}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Metascore:</strong> {game.metascore}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Genres:</strong> {game.genres.join(', ')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Description:</strong> {game.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="my-4">
        <Comments gameId={game.id} />
      </Container>
    </>
  );
}

export default GameDetail;
