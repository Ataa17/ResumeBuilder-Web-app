import './LandingPagecss.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ss from '../assets/ss.PNG';
import cv1 from '../assets/cvTemplate1.png';
import cv2 from '../assets/cvTemplate2.jpg';
import cv3 from '../assets/cvTemplate3.jpg';
import fc from "../assets/fc.svg";
import l from "../assets/linkedin.svg";
import g from "../assets/google.svg";

function LandingPage() {
  return (<>
    <script src="https://kit.fontawesome.com/a3f8546e79.js" crossorigin="anonymous"></script>
    <div className='first'>
      <h1 className='title1'>
        Build Your </h1>
      <h1 className='title1' >Resume for free
      </h1>
      <div className='subtitle'><h5>Empower your career journey with our intuitive resume</h5>
        <h5> builder for a standout professional profile</h5></div>

      <div className='but'><button type="button" class="btn btn-outline-secondary">Get Started</button>
      </div>

      <img src={ss} className='rounded main_img' alt="" />
    </div>
    <div className='second'>
      <div className='t2'>
        <h1 className='title2'>
          Choose Among A Lot Of Templates
        </h1>
      </div>
      <div class="container text-center">


        <div class="row">
          <div class="col">
            <img src={cv1} alt="" className='cv rounded' />
            <div>
              <h4 className='h4'>Over 20 Templates</h4>
              <h6 className='h6'>Unlock your potential with a variety of 20+
                unique resume templates</h6>
            </div>
          </div>
          <div class="col">
            <img src={cv2} alt="" className='cv rounded' />
            <div>
              <h4 className='h4'>Fully Customizable CV</h4>
              <h6 className='h6'>Craft your story with fully customizable CVs
                your journey, your way</h6>
            </div>
          </div>
          <div class="col">
            <img src={cv3} alt="" className='cv rounded' />
            <div>
              <h4 className='h4'>Instant Download</h4>
              <h6 className='h6'>Instantly elevate your CV with our free downloads </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='third row'>

      <div className='col-1'>
        <div className='t'>
          <table className='table'>
            <tr><img src={fc} alt="" className='fc icon' /></tr>
            <tr><img src={l} alt="" className='icon' /></tr>
            <tr><img src={g} alt="" className='icon' /></tr>
          </table>
        </div>
      </div>
      <div className='col-2'>

      </div>
      <div className='col-7'>
        <div className='divtitle3'>
          <h1 className='title3'>Wanna Get In</h1>
          <h1 className='title3'>  Touch With Us ?</h1>
        </div>
        <div className="row">
          <div className='col'>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email Adress'></input>

          </div>
          <div className='col'>
            <input type="text" class="form-control" placeholder='Full Name '></input>

          </div>
        </div>
        <div className='feedback'>
          <input type="text" class="form-control feed" id="floatingInputDisabled" placeholder="Feedback & Inquiries"></input>
        </div>
        <div>
          <span className='copyright'>
            © CodeCraft 2023 – All rights reserved
          </span>
        </div>
      </div>

    </div>
  </>
  )
}
export default LandingPage;