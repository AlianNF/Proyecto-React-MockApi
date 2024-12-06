import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameCard.css';

function GameCard({game}) {
    return (
       <Container>
          <Link to={`/game/${game.id}`} state={{ game }}>
            <Card className='gamecard'>
              <Card.Img variant="top" src={game.imageUrl} />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Container>
                  <Row>
                    <Col xs={6} className='Border-Col'  >
                      {game.releaseDate}
                    </Col>
                    <Col xs={6} className='Border-Col'>
                      {game.metascore} metascore
                    </Col>
                    <Col xs={12} className='Border-Col' >
                      {game.genres.join(' - ')}
                    </Col>
                  </Row> 
                </Container>
                
                
              </Card.Body>
            </Card>
          </Link>
        </Container>
        
    );
  }
        
        

export default GameCard;