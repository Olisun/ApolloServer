import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Card } from 'react-bootstrap';

import './App.css';

// GQL query for fetching data
const GET_LAUNCHES = gql`
  {
    launches {
      flight_number
      mission_name
      launch_year
    }
  }
`;

//User component
const Launch = ({ launch: { flight_number, mission_name, launch_year } }) => (
  <div className='mb-3 px-0'>``
    <Card style={{ width: '54rem', margin: 'auto' }}>
      <Card.Body>
        <Card.Title>{mission_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{flight_number}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{launch_year}</Card.Subtitle>
      </Card.Body>
    </Card>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES)

  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  console.log(data)

  return (
    <main
      className="App" className='container'>
      <h1>Launches</h1>
      {data.launches.map(launch => (
        <Launch key={launch.flight_number} launch={launch} />
      ))}
    </main>
  );
}

export default App;
