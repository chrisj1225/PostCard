import React from 'react'; 

import TripsIndexMap from '../maps/trips_index/trips_index_map'; 
import TripsIndex from '../trips/trips_index'; 
import AddButton from '../util/add_button'; 

class Landing extends React.Component {
  constructor(props) {
    super(props); 

    this.state = { followed: false }

    this.handleClick = this.handleClick.bind(this); 
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleFollowed = this.toggleFollowed.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllTrips();
  }

  toggleFollowed() {
    if (!this.props.loggedIn) {
      this.props.openModal('login'); 
      return; 
    }

    if(!this.state.followed){
      this.setState({followed: true})
      this.props.fetchFollowedTrips()
    }
  }
  
  toggleAll(){
    if(this.state.followed){
      this.setState({followed: false})
      this.props.fetchAllTrips() 
    }
  }

  handleClick() {
    if (this.props.loggedIn) {
      this.props.history.push('/trips/new');
    } else {
      document.body.style.overflow = 'hidden';
      this.props.openModal("login"); 
    }
  }

  render() {
    const { trips, postcards } = this.props; 

    return (
      <div className="landing-container">
        <TripsIndexMap key={`${Math.random()*100000000}`} history={this.props.history} trips={trips} postcards={postcards} />
        <aside>
          <div className="filter-dropdown">
            <button 
              className="all-button" 
              onClick={this.toggleAll} 
              className={this.state.followed ? "inactive" : "active"}
            >All</button>
            <button 
              className="follow-button" 
              onClick={this.toggleFollowed} 
              className={this.state.followed ? "active" : "inactive"}
            >Followed</button>
          </div>
          <TripsIndex trips={trips} />
        </aside>
        <AddButton handleClick={this.handleClick}/>
      </div>
    )
  }
}; 

export default Landing; 