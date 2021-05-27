import React from 'react'; 
import { Link } from 'react-router-dom'; 

import PostcardImage from './postcard_image'; 
import PostcardShowMap from '../maps/postcard_show/postcard_show_map';

class PostcardShow extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      files: "",
      active: null
    }
    
    this.toggleActive = this.toggleActive.bind(this); 
    this.uploadImages = this.uploadImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostcard(this.props.postcardId)
  }

  toggleActive(e) {
    if (e.currentTarget.id === this.state.active) {
      this.setState({active: null}); 
    } else {
      this.setState({active: e.currentTarget.id}); 
    }
  }

  handleChange(e) {
    this.setState({
      files: e.target.files
    })
  }

  uploadImages(e) {
    e.preventDefault();
    let formData = new FormData();

    for (const file of this.state.files) {
      formData.append("images", file);
    }

    this.props.updatePostcardPhotos(this.props.postcardId, formData);
  }

  render() {
    const { postcard } = this.props; 

    if (!postcard) return null; 

    // debugger
    const imageUpload = (
      <form 
        onSubmit={this.uploadImages} 
        encType="multipart/form-data" 
        className="upload-image-form"
        >
        <label htmlFor="photo">
          <span>Add Photos</span>
          <input type="file" name='photo' id='photo' multiple
            onChange={this.handleChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    )

    return (
      <div className="postcard-show-wrapper">
        <header>
          <section>
            <Link to={`/trips/${postcard.tripId}`}>Back to trip overview</Link>
            <h1>{postcard.title}</h1>
            <p>{postcard.body}</p>
          </section>
          <aside>
            { <PostcardShowMap postcard={postcard} /> }
          </aside>
        </header>
        <main>
          <ul role="list">
            { postcard.photos.map((imageUrl, i) => (
              <PostcardImage 
                key={i} 
                idx={i}
                imageUrl={imageUrl} 
                toggleActive={this.toggleActive} 
                active={this.state.active}/>
            )) }
            { imageUpload }
          </ul>
        </main>
      </div>
    )
  }
}


export default PostcardShow; 