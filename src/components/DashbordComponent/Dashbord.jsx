import React from 'react';
import './Dashbord.css';
import Project from '../ProjectComponent/Project';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FontAwesome from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logoBlanc.png';
import { useState, useEffect } from 'react';

const project1 = {
  title: 'Project 1',
  description: "project 1 is a project",
  imgURL: 'https://placeholder.co/300',
}
const user = {
  name: 'Ataa',
  photo: 'https://placeholder.co/300',
};
const projects = [project1, project1, project1, project1, project1,]


function Dashbord() {
  const [show, setShow] = useState(true)
  const [screenSize, setScreenSize] = useState(true)
  const toggleMenu = () => {
    setScreenSize(window.innerWidth > 768)
    if (!screenSize) {
      setShow(!show);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 991);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!screenSize) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [screenSize]);



  return (
    <div className="container-fluid">
      <div className="row">

        <aside className='col-lg-3 col-sm-12 aside'>
          <div className="header nav-menu">
            <img src={logo} alt="logo" className='img-fluid noborder' />
            <a type='button' onClick={toggleMenu}>
              { 
              !screenSize?          (!(show) ? <FontAwesomeIcon className='icon' icon={FontAwesome.faBars} /> : <FontAwesomeIcon className='icon' icon={FontAwesome.faXmark} />):null

              }
            </a>
          </div>



          {
            show ?
              (
                <>
                  <div>
                    <img className='img-fluid' src={user.photo ? user.photo : "https://placeholder.co/300"} alt="user image" />



                    <a type='button'  >
                      <h1 className='text-center'>{user.name}</h1>

                    </a>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <button className={
                          !screenSize ? 'btn text-center btn1' : 'btn btn1'
                        }>
                          <FontAwesomeIcon className='icon' icon={FontAwesome.faAdd} />
                          Create a new project
                        </button>
                      </li>
                      <li ><a type='button' className={
                        !screenSize ? 'btn text-center btn1' : 'btn btn1'
                      }><FontAwesomeIcon className='icon' icon={FontAwesome.faFolderOpen} />
                        Browse Templates</a></li>
                      <li ><a type='button' className={
                        !screenSize ? 'btn text-center btn1 ' : 'btn btn1'
                      }>
                        <FontAwesomeIcon className='icon' icon={FontAwesome.faGear} />
                        Settings</a></li>
                    </ul>
                  </div>
                  <div className="logout">
                    <button className='btn btn1'>
                    <FontAwesomeIcon className='icon' icon={FontAwesome.faSignOut} />

                      Log out</button>
                  </div>
                </>
              ) : null
          }
        </aside>
        <main className='col-lg-9 col-sm-12'>
          <div className="row row-cols-3">
            <a type='button' className="add">
              <div >
              <FontAwesomeIcon className='icon' icon={FontAwesome.faFile} />

                Add a new project 

              </div>
            </a>
            {
              projects.length > 0 ? (
                projects.map((p) => {
                  return (<Project key={p.title} project={p} />)
                })
              ) : (
<div className="info">
<a type='button' className="add">
              <div >
              <FontAwesomeIcon className='icon' icon={FontAwesome.faFolderBlank} />

                <h1>There are no Projects !</h1>

              </div>
            </a>
</div>              )
            }
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashbord;
