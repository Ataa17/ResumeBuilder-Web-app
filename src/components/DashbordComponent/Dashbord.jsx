import React from 'react';
import './Dashbord.css';
import Project from '../ProjectComponent/Project';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
const projects = [project1, project1, project1, project1, project1, project1,]


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
      setScreenSize(window.innerWidth > 768);
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

          <div>
            <img className='img-fluid' src={user.photo ? user.photo : "https://placeholder.co/300"} alt="user image" />
            <a type='button' onClick={toggleMenu}>            <h1 className='text-center'>{user.name}
              {
                !show ? <>, click to see the menu</> : null
              }

            </h1>
            </a>
          </div>

          {
            show ?
              (
                <>
                  <div>
                    <ul>
                      <li>
                        <button className={
                          !screenSize ? 'btn text-center btn1' : 'btn btn1'
                        }>
                          <FontAwesomeIcon icon="fa-solid fa-gear" />
                          Create a new project
                        </button>
                      </li>
                      <li ><a type='button' className={
                        !screenSize ? 'btn text-center btn1' : 'btn btn1'
                      }><FontAwesomeIcon icon="fa-solid fa-gear" />
                        Browse Templates</a></li>
                      <li ><a type='button' className={
                        !screenSize ? 'btn text-center btn1' : 'btn btn1'
                      }>Settings</a></li>
                    </ul>
                  </div>
                  <div className="logout">
                    <button className='btn btn1'>Log out</button>
                  </div>
                </>
              ) : null
          }
        </aside>
        <main className='col-lg-9 col-sm-12'>
          <div className="row row-cols-3">
            <a href="#" className="add">
              <div >
                Add a new project +

              </div>
            </a>
            {
              projects.length > 0 ? (
                projects.map((p) => {
                  return (<Project key={p.title} project={p} />)
                })
              ) : (
                <h1>There are no projects</h1>
              )
            }
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashbord;
