import React, { useState, useEffect } from 'react';
import GameCard from './GameCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('https://6706138a031fd46a8311db2c.mockapi.io/api/v1/Game');
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <Container>
      <Row className="g-4">
        {games.map((game) => (
          <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GameList;