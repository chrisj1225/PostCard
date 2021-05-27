import React from 'react'; 
import { Link } from 'react-router-dom'; 

const TripIndexItem = ({ trip }) => {

  return (
    <div className="trips-index-item" id={`trip-item-${trip._id}`}>
      <section>
        <Link to={`trips/${trip._id}`}>
          <h2>{trip.title}</h2>
        </Link>
        <p>{trip.description}</p>
      </section>
      <div>
        <ul role="list">
          {/* images */}
          {/* <li><img src="" alt=""/></li> */}
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
  
}

export default TripIndexItem; 