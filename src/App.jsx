import { useState } from 'react';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
const [imageSelected, setImageSelected] = useState(false);
const [skipImage, setSkipImage] = useState(false);

const handleCheckboxChange = (e) => {
  setSkipImage(e.target.checked);
};
const handleImageChange = (e) => {
  setImageSelected(e.target.files.length > 0);
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch('http://chance.chasingachance.com/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='story-main'>
      <div className='chance-donate'>
        <a
          className='chance-donate-link'
          href='https://support.morrisanimalfoundation.org/page/56178/donate/1'
          target='_blank'
        >
          Donate to Dog Cancer Research
        </a>
      </div>

      <img className='chance-one' src='/images/chance1.png' alt='Chance'></img>

      <div className='story-text'>
        <h1 className='chance-name'>Chance</h1>
        <h4 className='chance-subheading'>About me!</h4>
        <hr />
        <p className='chance-paragraph'>
          We found Chance in 2017, shortly after our honeymoon. He was a rescue at the Kanawha County Humane Society. With a passion for destroying shoes and cords, and big brown puppy eyes, we fell
          in love at first sight. Chance was the best friend we could have asked for. He made us laugh, made us feel safe, and we felt his love every day. In 2022 Chance was diagnosed with a mast cell
          tumor. We were devestated, but were determined to help him fight it with all his strength. He did amazing after surgery and lived his life just as freely as he did before the cancer. Sadly in
          December of 2024, Chance's cancer returned. He was diagnosed with a hemangiosarcoma, and we were told he only had a few days left. In spite of this, Chance continued to be the happiest boy and
          remained full of life and joy until the very end. Chance beat the odds and stayed with us until January 2025, giving us the best Christmas present we could have asked for. Chance will always be
          loved and always be missed.
          <br />
          <br />
          Thank you, Chance.
        </p>
      </div>

      <div className='chance-video-main'>
        <video className='chance-one' controls>
          <source src='/images/chance_video.mp4' type='video/mp4' />
        </video>
      </div>

      <div className='share-container'>
        <h1 className='chance-name'>Enjoying your Sharkie?</h1>
        <h4 className='chance-subheading'>Share a picture of your dog and Sharkie!</h4>

        {!submitted ? (
          <form
            id='donation-form'
            className='donation-form'
            encType='multipart/form-data'
            onSubmit={handleSubmit}
          >
            <h2 className='form-title'>Share Your Story & Support</h2>

            <label htmlFor='story' className='form-label'>
              Your Story
            </label>
            <textarea
              id='story'
              name='story'
              className='form-textarea'
              rows='5'
              placeholder='Write about your dog!...'
              required
            ></textarea>

          <label htmlFor='image' className='form-label'>
  Upload a picture of your dog!
</label>
<input
  type='file'
  id='image'
  name='image'
  className='form-input'
  accept='image/*'
  onChange={handleImageChange}
/>

<div style={{ marginBottom: '1rem' }}>
  <label className='chance-checkbox'>
    <input type='checkbox' onChange={handleCheckboxChange} /> Submit without an image
  </label>
</div>

<button
  type='submit'
  className='chance-donate-link'
  disabled={!imageSelected && !skipImage}
  style={{
    opacity: imageSelected || skipImage ? 1 : 0.6,
    cursor: imageSelected || skipImage ? 'pointer' : 'not-allowed'
  }}
>
  Submit Story
</button>
          </form>
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              fontSize: '20px',
              color: '#2d572c',
              marginTop: '20px',
              marginBottom: '5rem;',
              height: '250px'
            }}
          >
            Thank you for your submission!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
