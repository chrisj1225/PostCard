import React from 'react'; 
import { Link } from 'react-router-dom'; 

import TripsIndexMap from '../maps/trips_index/trips_index_map'; 
import TripsIndex from '../trips/trips_index'; 
import AddButton from '../util/add_button'; 

class UserShow extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      followed: false
    }

    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserTrips(this.props.userId)
      .then(res => {
        if (Object.values(this.props.currentUser).length) {
          if (this.props.currentUser.following.includes(this.props.user._id)) {
            this.setState({
              followed: true
            })
          }
        }
      });
  }

  toggleFollow() {
    if (!this.state.followed) {
      this.props.createFollow(this.props.user._id)
        .then(res => {
          this.setState({
            followed: true
          })
        })
    } else {
      this.props.deleteFollow(this.props.user._id)
        .then(res => {
          this.setState({
            followed: false
          })
        })
    }
  }


  render() {
    const { trips, postcards, user, currentUser } = this.props; 

    if (!user) return null;

    const currentUsersPage = user._id === currentUser._id; 
    const headline = currentUsersPage ? "My Trips" : user.displayName + "'s trips"; 

    const followButton = (currentUser) && (currentUser._id === user._id) ? null : 
    (Object.values(currentUser).length) ? (
      (this.state.followed) ? (
        <button className={"follow-btn following"} onClick={this.toggleFollow}>Following</button>
      ) : (
        <button className={"follow-btn"} onClick={this.toggleFollow}>Follow</button>
      )
    ) : null; 

    return (
      <div className="user-show-container">
        <aside>
          <div className="user-details">
            <h1>{headline}</h1>
            {followButton}
          </div>
          <TripsIndex userShow={true} trips={trips} /> 
          { currentUsersPage ? (
            <Link to={"/trips/new"}>
              <AddButton />
            </Link>
          ) : null}
        </aside>
        <TripsIndexMap 
          key={`${Math.random()*100000000}`} 
          history={this.props.history} 
          trips={trips} postcards={postcards} 
        />
      </div>
    )
  }


}; 

export default UserShow; 