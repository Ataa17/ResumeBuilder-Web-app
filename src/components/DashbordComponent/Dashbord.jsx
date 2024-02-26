import React from "react";
import Project from "../ProjectComponent/Project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FontAwesome from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logoBlanc.png";
import { useState, useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";

const project1 = {
  title: "Project 1",
  description: "project 1 is a project",
  imgURL: "https://placeholder.co/300",
};
const user = {
  name: "Ataa",
  photo: "https://placeholder.co/300",
};
const projects = [project1, project1, project1, project1, project1];

function Dashbord({ auth ,setAuth}) {
  const [show, setShow] = useState(true);
  const [screenSize, setScreenSize] = useState(true);
  const toggleMenu = () => {
    setScreenSize(window.innerWidth > 768);
    if (!screenSize) {
      setShow(!show);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 991);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const loadStyles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        setLoading(false);
      } catch (error) {
        console.error("Error loading styles:", error);
        setLoading(false);
      }
    };

    loadStyles();
  }, []);
  const [projs, setProjs] = useState([]);
  useEffect(() => {
    async function fetchProjects() {
      if (!auth) return;
      try {
        const response = await fetch("http://localhost:8000/project/list", {
          method: "GET",
          headers: {
            authorization: auth,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Projects Response:", data);

        setProjs((prev) => {
          const temp = data.map((p, index) => {
            const timestamp = p.creationDate;
            const date = new Date(timestamp);

            const formattedDate = date.toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC",
            });

            return {
              title: p.title,
              description: `This is project ${index}`,
              imgURL: "https://placeholder.co/300",
              projectId: p.id,
              date: formattedDate,
            };
          });

          return temp;
        });

        if (!response.ok) {
          console.error("Projects fetch failed.");
        }
        return data;
      } catch (error) {
        console.error("Error during projects fetch:", error);
      }
    }

    fetchProjects();
  }, [auth]);
  const [newProjShow, setNewProjShow] = useState(true);
  const [trigger, setTrigger] = useState([false, "name"]);
  useEffect(() => {
    console.log(auth);
    async function CreateProj() {
      if (!auth) return;
      if (!trigger[0]) return;
      setTrigger((prev) => [false, prev[1]]);
      try {
        const response = await fetch("http://localhost:8000/project/new", {
          method: "POST",
          headers: {
            authorization: auth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trigger[1],
            templateName: "Marine",
          }),
        });

        const data = await response.json();
        console.log("Create Project Response:", data);
        if (data && data.project) {
          setProjs((prev) => {
            const temp = [...prev];
            const timestamp = new Date(data.project.creationDate);
            temp.unshift({
              title: data.project.title,
              description: `This is project ${temp.length}(created)`,
              imgURL: "https://placeholder.co/300",
              projectId: data.project.id,
              date: timestamp.toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "UTC",
              }),
            });
            return temp;
          });
        }

        if (!response.ok) {
          console.error("Project create failed.");
        }
      } catch (error) {
        console.error("Error during project create:", error);
      }
    }
    CreateProj();
  }, [trigger[0]]);

  return (
    <div
      className="   "
      style={{
        visibility: loading ? "hidden" : "visible",
        backgroundColor: "#e9edf0",
      }}
    >
      <div className="flex lg:flex-row flex-col h-full overflow-hidden ">
        <aside
          className="col-lg-3 col-sm-12 p-16 text-center flex flex-col lg:w-2/6 lg:h-screen  lg:fixed overflow-hidden"
          style={{
            backgroundColor: "rgb(74, 92, 228)",
            color: "#fff",
          }}
        >
          <div className="p-3 flex items-center  justify-between">
            <img src={logo} alt="logo" className=" w-40  " />
            <a type="button" onClick={toggleMenu}>
              {!screenSize ? (
                !show ? (
                  <FontAwesomeIcon className="icon" icon={FontAwesome.faBars} />
                ) : (
                  <FontAwesomeIcon
                    className="icon"
                    icon={FontAwesome.faXmark}
                  />
                )
              ) : null}
            </a>
          </div>

          {show ? (
            <div className="flex flex-col items-center justify-center ">
              <div className="flex flex-col justify-center items-center">
                <img
                  className=" rounded-[50%] text-center w-48 h-48"
                  src={user.photo ? user.photo : "https://placeholder.co/300"}
                  alt="user image"
                />

                <a type="button">
                  <h1 className="text-center text-4xl mt-2">{user.name}</h1>
                </a>
              </div>
              <div className="mt-4">
                <ul className="space-y-6">
                  <li>
                    <button
                      className="text-black hover:text-white duration-150 transition-all"
                      onClick={() => {
                        setNewProjShow(false);
                      }}
                    >
                      <FontAwesomeIcon
                        className="icon"
                        icon={FontAwesome.faAdd}
                      />
                      Create a new project
                    </button>
                  </li>
                  <li>
                    <a
                      type="button"
                      className="text-black hover:text-white duration-150 transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon
                        className="icon"
                        icon={FontAwesome.faFolderOpen}
                      />
                      Browse Templates
                    </a>
                  </li>
                  <li>
                    <a
                      type="button"
                      className="text-black hover:text-white duration-150 transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon
                        className="icon"
                        icon={FontAwesome.faGear}
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
              <div className="logout mt-6">
                <button className="text-black hover:text-white duration-150 transition-all"
                onClick={(e)=>
                {
                  e.preventDefault();
                  setAuth(undefined);
                  Cookies.remove('authToken');
                }}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={FontAwesome.faSignOut}
                  />
                  Log out
                </button>
              </div>
            </div>
          ) : null}
        </aside>
        <div className="lg:w-2/6 ">

        </div>
        <main className="col-lg-9 col-sm-12 lg:w-4/6 ">
          <div className=" flex-col md:flex-row md:flex-wrap flex gap-4 justify-around overflow-y-auto">
            {newProjShow ? (
              <div
                type="button"
                className="w-72  rounded-md p-4 m-5 bg-white transition duration-200 ring-2 border border-blue-700 flex justify-center items-center"
                style={{
                  boxShadow: "0 0 0 0px rgba(0, 0, 255, 0.5)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "2px 4px 2px 1px rgba(0, 0, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 0px rgba(0, 0, 255, 0.5)";
                }}
                onClick={() => setNewProjShow(false)}
              >
                <div className="">
                  <FontAwesomeIcon className="icon" icon={FontAwesome.faFile} />
                  Add a new project
                </div>
              </div>
            ) : (
              <div
                className="w-72  rounded-md p-4 m-5 bg-white transition duration-200 ring-2 border border-blue-700 flex justify-center items-center  flex-col space-y-12"
                style={{
                  boxShadow: "0 0 0 0px rgba(0, 0, 255, 0.5)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "2px 4px 2px 1px rgba(0, 0, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 0px rgba(0, 0, 255, 0.5)";
                }}
              >
                <div>
                  <label htmlFor="name" className="mt-4">
                    name :
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-200 rounded-md h-8 px-2"
                    onChange={(e) =>
                      setTrigger((prev) => [prev[0], e.target.value])
                    }
                  />
                </div>
                <div>
                  <label htmlFor="tempi mr-10" className="mr-8">
                    template :
                  </label>
                  <select name="" id="tempi">
                    <option value="">Obsidian</option>
                    <option value="">Marine</option>
                  </select>
                </div>
                <div className="flex  space-x-12">
                  <button
                    className="bg-pink-200 px-2 rounded-lg mt-4 mb-2"
                    onClick={() => setTrigger((prev) => [true, prev[1]])}
                  >
                    Create
                  </button>
                  <button
                    className="bg-pink-200 px-2 rounded-lg mt-4 mb-2"
                    onClick={() => {
                      setNewProjShow(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {projs.length > 0 ? (
              projs.map((p, index) => {
                return (
                  <Project
                    key={index}
                    project={p}
                    projs={projs}
                    setProjs={setProjs}
                    auth={auth}
                  />
                );
              })
            ) : (
              <div className="info">
                <a type="button" className="add">
                  <div>
                    <FontAwesomeIcon
                      className="icon"
                      icon={FontAwesome.faFolderBlank}
                    />

                    <h1>There are no Projects !</h1>
                  </div>
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashbord;
