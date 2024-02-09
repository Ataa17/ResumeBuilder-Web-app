import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Transition } from "@headlessui/react";
import p1 from "../assets/chevron-down-svgrepo-com.svg";
import p2 from "../assets/fill-svgrepo-com.svg";
import arrow_up from "../assets/chevron-up-svgrepo-com.svg";
import p3 from "../assets/text-aa-bold-svgrepo-com copy.svg";
import drag_img from "../assets/drag-vertical-svgrepo-com.svg";
import p4 from "../assets/more-vertical-svgrepo-com.svg";
import p5 from "../assets/person-line-drawing-svgrepo-com.svg";
import p6 from "../assets/plus-large-svgrepo-com.svg";
import p7 from "../assets/menu-svgrepo-com.svg";
import p8 from "../assets/download-minimalistic-svgrepo-com.svg";
import p9 from "../assets/more-vertical-svgrepo-comcopy.svg";
import p10 from "../assets/chevron-down-svgrepo-comcopy.svg";
import p11 from "../assets/text-square-svgrepo-com.svg";
import p12 from "../assets/menu-svgrepo-comcopy.svg";
import p13 from "../assets/full-screen-svgrepo-com.svg";
import tick from "../assets/tick.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import d from "../assets/delete.svg";
import edit from "../assets/edit.svg";

const monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDate = new Date();
const year = currentDate.getFullYear();

const years = Array.from({ length: year - 1989 }, (_, i) => i + 1990).reverse();
const grad_years = Array.from(
  { length: year - 1979 },
  (_, i) => i + 1990
).reverse();

const finalSpaceCharacters = [
  {
    id: "1",
    name: "Education",
  },
  {
    id: "2",
    name: "Languages",
  },
  {
    id: "3",
    name: "Interests",
  },
  {
    id: "4",
    name: "skills",
  },
  {
    id: "5",
    name: "Work experience",
  },
];
const language_levels = [
  "Basic",
  "Intermediate",
  "Advanced",
  "Fluent",
  "Native",
];

const sizes = ["sm", "md", "lg"];
const fonts = ["sans", "serif", "mono"];
const bg_colors = ["white", "gray", "black"];
const spacing = ["sm", "md", "lg"];

const col = "#E9EDF0";
const col2 = "#4A5CE4";

const handleOnDragEnd = (result, items, setItems) => {
  if (!result.destination) return;

  const updatedItems = [...items];
  const [movedItem] = updatedItems.splice(result.source.index, 1);
  updatedItems.splice(result.destination.index, 0, movedItem);
  setItems(updatedItems);
};

export default function EditingPage(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [add, setAdd] = useState([true, true, true]);
  const [items, setItems] = useState(finalSpaceCharacters);
  const [Options, setOptions] = useState([false, false, false, false, false]);
  const [disp_content, setDisp_content] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [Languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [Interests, setInterests] = useState([]);
  const [PersonalDetails, setPersonalDetails] = useState([]);
  const [selected_Options, setSelectedOptions] = useState([0, 0, 0, 0,0]);
  const [showPreview, setShowPreview] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const pos_ref = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const handlePersonalDetails = (e) => {
    // pass all the arguments you need
    setPersonalDetails([
      ...PersonalDetails,
      { name: e.target.name, value: e.target.value },
    ]); // needs more attributes this is just an example
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleInterests = (e) => {
    setInterests([...Interests, e.target.value]);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    setItems(updatedItems);
  };
  const disp = (state, num) => {
    /// gotta optimize this shit like the shit below it
    switch (num) {
      case 1:
        setOptions([!state, false, false, false, false]);
        break;
      case 2:
        setOptions([false, !state, false, false, false]);
        break;
      case 3:
        setOptions([false, false, !state, false, false]);
        break;
      case 4:
        setOptions([false, false, false, !state, false]);
        break;
      case 5:
        setOptions([false, false, false, false, !state]);
        break;
      default:
        break;
    }
  };
  const disp_content_switch = (state, num) => {
    setDisp_content((prevState) => {
      const temp = [...prevState];
      temp.fill(false);
      temp[num] = !state;
      return temp;
    });
  };
  //
  useEffect(() => {
    const handleResize = () => {
      setWidth((prevWidth) => {
        const oldWidth = prevWidth;
        const newWidth = window.innerWidth;
        if (oldWidth > 1024 && newWidth <= 1024) {
          setShowPreview(false);
        }
    
        return newWidth; 
      });
    };
    
    

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-row h-screen bg-white "
      style={{ color: "#47535C" }}
    >
      <button
        className={
          !showPreview
            ? "z-50  justify-center items-center  text-black  lg:hidden bg-blue-200 rounded-[50%] w-14 h-14 right-10 bottom-10 fixed"
            : "hidden"
        }
        onClick={() => setShowPreview((prevState) => !prevState)}
      >
        ding
      </button>
      <div
        className={
          !showPreview
            ? "w-3/5 header flex-grow  md:overflow-y-auto "
            : width < 1024
            ? "hidden"
            : "w-3/5 header flex-grow  md:overflow-y-auto"
        }
      >
        <div className="flex flex-row justify-between p-5  items-center max-w-[670px] mx-auto ">
          <h1 className="font-light text-[34px] text-black">
            {" "}
            Personal details
          </h1>
          <div className="flex">
            <button>
              <img
                src={p4}
                style={{ borderColor: "#4A5CE4CC" }}
                alt="person"
                className="border-2 rounded-xl w-10 h-10 hover:scale-110 mr-5"
              />
            </button>
            <button onClick={() => disp_content_switch(disp_content[0], 0)}>
              {disp_content[0] ? (
                <img
                  src={arrow_up}
                  style={{ borderColor: "#4A5CE4CC" }}
                  alt="person"
                  className="w-10 h-10 hover:scale-110 border-2 rounded-xl border-black "
                />
              ) : (
                <img
                  style={{ borderColor: "#4A5CE4CC" }}
                  src={p1}
                  alt="person"
                  className="w-10 h-10 hover:scale-110 border-2 rounded-xl border-black "
                />
              )}
            </button>
          </div>
        </div>
        <Transition
          show={disp_content[0]}
          enter="transition-all ease-out duration-500"
          enterFrom="opacity-0 transform scale-95"
          enterTo="opacity-100 transform scale-100"
          leave="transition-all  duration-0"
          leaveFrom="opacity-100 transform scale-100"
          leaveTo="opacity-0 transform scale-95"
        >
          <div className="flex flex-row  px-8 justify-center items-center flex-grow-1 ">
            <div className="flex gap-5  h-full">
              <div
                style={
                  imageUrl == null
                    ? { backgroundColor: col }
                    : {
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                }
                onClick={() => document.getElementById("imageInput").click()}
                className="w-[150px] h-[160px] rounded-[10px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-95"
              >
                {imageUrl == null && (
                  <img src={p5} alt="person" className="w-10 h-10" />
                )}
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-1 space-y-8">
                <div className="flex gap-2 ">
                  <div className="flex-1 space-y-2">
                    <label>First name</label>
                    <br />
                    <input
                      style={{ backgroundColor: col }}
                      type="text"
                      alt="name"
                      className=" h-3/4 transition-all duration-300 w-full h-13 rounded px-2"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label>Last name</label>
                    <br />
                    <input
                      style={{ backgroundColor: col }}
                      type="text"
                      alt="name"
                      className="  h-3/4 transition-all duration-300 w-full rounded px-2"
                    />
                  </div>
                </div>
                <div className="h-1/4  space-y-2">
                  <label>Email</label>
                  <br />
                  <input
                    style={{ backgroundColor: col }}
                    type="text"
                    alt="name"
                    className="  h-full transition-all duration-300 w-full rounded px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[670px] space-y-9 ">
            <div className="h-[40px] mt-6 mx-8">
              <label>Job title</label>
              <br />
              <input
                style={{ backgroundColor: col }}
                type="text"
                alt="name"
                className="h-full transition-all duration-300 w-full rounded px-2"
              />
            </div>
            <div className="h-[40px] space-y-2 mx-8">
              <label>Phone number</label>
              <br />
              <input
                style={{ backgroundColor: col }}
                type="text"
                alt="name"
                className="h-full transition-all duration-300 w-full rounded px-2"
              />
            </div>
            <div className="h-[40px] space-y-2 mx-8">
              <label>Address</label>
              <br />
              <input
                style={{ backgroundColor: col }}
                type="text"
                alt="name"
                className="h-full transition-all duration-300 w-full rounded px-2"
              />
            </div>
            <div className=" flex-row flex  items-center justify-between gap-12 mx-8 max-w-[640px] space-y-2">
              <div className="h-[40px] space-y-2 flex-1">
                <label>City</label>
                <br />
                <input
                  style={{ backgroundColor: col }}
                  type="text"
                  alt="name"
                  className="h-full transition-all duration-300 w-full rounded px-2"
                />
              </div>
              <div className="h-[40px] space-y-1 flex-1 ">
                <label>Postal code</label>
                <br />
                <input
                  style={{ backgroundColor: col }}
                  type="text"
                  alt="name"
                  className="h-full transition-all duration-300 w-full rounded px-2"
                />
              </div>
            </div>
            <br></br>
            <button className=" transition-all duration-300 hover:scale-95 mx-8 rounded-lg border-2 h-10 w-1/2 border-blue-700 max-w-[200px] flex justify-center items-center text-lg">
              <img src={p6} alt="person" className=" w-8 h-8  mr-5 " />
              Add section
            </button>
          </div>
          <br></br>
        </Transition>

        <div className="max-w-[670px] mx-auto">
          <hr
            className="w-11/12 mx-auto mt-8 border-1 "
            style={{ borderColor: "#4A5CE4CC" }}
          />
          <DragDropContext
            onDragEnd={(result) => handleOnDragEnd(result, items, setItems)}
          >
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-5"
                >
                  {items.map((character, index) => (
                    <Draggable
                      key={character.id}
                      draggableId={character.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            ref={pos_ref[index]}
                            className="bg-white mb-5 rounded-lg h-10 w-full border-blue-700 flex justify-between items-center text-lg text-black"
                          >
                            <div className="flex">
                              <img
                                {...provided.dragHandleProps}
                                src={drag_img}
                                alt=""
                                className="w-8 h-8 mr-5 opacity-80"
                              />
                              <h1 className="text-left pl-5">
                                {character.name}
                              </h1>
                            </div>
                            <button
                              onClick={() => {
                                disp_content_switch(
                                  disp_content[parseInt(character.id)],
                                  parseInt(character.id)
                                );
                                pos_ref[index].current.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }}
                              style={{ borderColor: "#4A5CE4CC" }}
                              className=" w-10 h-10 hover:scale-110 border-2 rounded-xl border-black"
                            >
                              {disp_content[parseInt(character.id)] ? (
                                <img src={arrow_up} alt="person" />
                              ) : (
                                <img src={p1} alt="person" />
                              )}
                            </button>
                          </div>
                          <Transition
                            show={disp_content[parseInt(character.id)]}
                            enter="transition-all ease-out duration-700"
                            enterFrom="opacity-10 transform scale-95"
                            enterTo="opacity-100 transform scale-100"
                            leave="transition-all ease-in  duration-500"
                            leaveFrom="opacity-100 transform scale-100"
                            leaveTo="opacity-0 transform scale-95"
                          >
                            <div>
                              {disp_content[parseInt(character.id)] &&
                                (character.id === "1" ? (
                                  <EducationComponent />
                                ) : character.id === "2" ? (
                                  <LanguagesComponent
                                    val={Languages}
                                    setLanguages={setLanguages}
                                    add={add}
                                    setAdd={setAdd}
                                    adding_index={0}
                                    thing="Language"
                                  />
                                ) : character.id === "3" ? (
                                  <InterestsComponent
                                    val={Interests}
                                    setInterests={setInterests}
                                    add={add}
                                    setAdd={setAdd}
                                    adding_index={1}
                                  />
                                ) : character.id === "4" ? (
                                  <LanguagesComponent
                                    val={skills}
                                    setLanguages={setSkills}
                                    add={add}
                                    adding_index={2}
                                    setAdd={setAdd}
                                    thing="Skill"
                                  />
                                ) : (
                                  <ProfessionalExperienceComponent />
                                )
                                )}
                            </div>
                          </Transition>
                          <hr style={{ borderColor: "#4A5CE4CC" }}></hr>
                          <br></br>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div
        className={
          width >= 1024 ? "w-2/5" : showPreview ? "w-full fixed z-1" : "hidden"
        }
        style={{ backgroundColor: col }}
      >
        <div className="grid grid-rows-12 h-screen">
          <div
            className="row-span-1 flex justify-between items-center"
            style={{ backgroundColor: col2 }}
          >
            <button>
              <img src={p8} alt="person" className=" w-8 h-8  mx-4" />
            </button>
            <h1 className="text-white text-lg"> oussama's portfolio</h1>
            <button>
              <img src={p9} alt="person" className=" w-8 h-8 mx-4" />
            </button>
          </div>
          <div className="row-span-10 flex justify-center items-center">
            Live Preview
          </div>
          <div
            className={
              width >= 1024
                ? "row-span-1 w-11/12 mx-auto   rounded-xl h-12  max-w-[400px] right-0 bottom-0 flex justify-between items-center relative"
                : "fixed w-11/12    rounded-xl h-12  max-w-[400px] bottom-6 left-1/2 transform -translate-x-1/2 flex justify-between items-center "
            }
            style={{ backgroundColor: col2 }}
          >
            <button
              className="flex gap-0 space-x-0"
              onClick={() => disp(Options[0], 1)}
            >
              <img src={p3} alt="person" className=" w-5 h-5 ml-4" />
              <img src={p10} alt="person" className=" w-5 h-5 mr-4" />
            </button>
            {Options[0] && (
              <div
                className=" animate-fadeIn bg-white shadow-lg p-4 text-black space-y-2 rounded-md"
                style={{ position: "absolute", top: "-385%", left: 0 }}
              >
                <label className="text-xl font-semibold">Font</label>
                {fonts.map((font, index) => (
                  <button
                    className="flex gap-0 space-x-0 justify-between items-center w-full hover:bg-gray-100 p-1 rounded-md hover:shadow-md"
                    onClick={() => {
                      disp(Options[0], 1);
                      setSelectedOptions(() => {
                        const arr = selected_Options;
                        arr[0] = index;
                        return arr;
                      });
                    }}
                  >
                    <h1>{font}</h1>
                    {selected_Options[0] === index && (
                      <img className="h-5 w-5" src={tick}></img>
                    )}
                  </button>
                ))}
              </div>
            )}
            <button
              className="flex gap-0 space-x-0"
              onClick={() => disp(Options[1], 2)}
            >
              <img src={p11} alt="person" className=" w-5 h-5  ml-4" />
              <img src={p10} alt="person" className=" w-5 h-5  mr-4" />
            </button>
            {Options[1] && (
              <div
                className="  bg-white shadow-lg p-4 text-black  space-y-2 rounded-md p-4"
                style={{ position: "absolute", top: "-385%", left: "25%" }}
              >
                <label className="text-xl font-semibold">text size</label>
                {sizes.map((size, index) => (
                  <button
                    className="flex gap-0 space-x-0 justify-between items-center w-full hover:bg-gray-100 p-1 rounded-md hover:shadow-md"
                    onClick={() => {
                      disp(Options[1], 2);
                      setSelectedOptions(() => {
                        const arr = selected_Options;
                        arr[1] = index;
                        return arr;
                      });
                    }}
                  >
                    <h1>{size}</h1>
                    {selected_Options[1] === index && (
                      <img className="h-5 w-5" src={tick}></img>
                    )}
                  </button>
                ))}
              </div>
            )}
            <button
              className="flex gap-0 space-x-0"
              onClick={() => disp(Options[2], 3)}
            >
              <img src={p12} alt="person" className=" w-5 h-5  ml-4" />
              <img src={p10} alt="person" className=" w-5 h-5  mr-4" />
            </button>
            {Options[2] && (
              <div
                className="  bg-white shadow-lg p-4 text-black  space-y-2 rounded-md"
                style={{ position: "absolute", top: "-385%", left: "45%" }}
              >
                <label className="text-xl font-semibold">text spacing</label>
                {spacing.map((space, index) => (
                  <button
                    className="flex gap-0 space-x-0 justify-between items-center w-full hover:bg-gray-100 p-1 rounded-md hover:shadow-md"
                    onClick={() => {
                      disp(Options[2], 3);
                      setSelectedOptions(() => {
                        const arr = selected_Options;
                        arr[2] = index;
                        return arr;
                      });
                    }}
                  >
                    <h1>{space}</h1>
                    {selected_Options[2] === index && (
                      <img className="h-5 w-5" src={tick}></img>
                    )}
                  </button>
                ))}
              </div>
            )}
            <button
              className="flex gap-0 space-x-0"
              onClick={() => disp(Options[3], 4)}
            >
              <img src={p2} alt="person" className=" w-5 h-5  ml-4" />
              <img src={p10} alt="person" className=" w-5 h-5  mr-4" />
            </button>
            {Options[3] && (
              <div
                className="  bg-white shadow-lg p-4 text-black  space-y-2 rounded-md"
                style={{ position: "absolute", top: "-425%", left: "65%" }}
              >
                <label className="text-md font-semibold">
                  background color
                </label>
                {bg_colors.map((color, index) => (
                  <button
                    className="flex gap-0 space-x-0 justify-between items-center w-full hover:bg-gray-100 p-1 rounded-md hover:shadow-md"
                    onClick={() => {
                      disp(Options[3], 4);
                      setSelectedOptions(() => {
                        const arr = selected_Options;
                        arr[3] = index;
                        return arr;
                      });
                    }}
                  >
                    <h1>{color}</h1>
                    {selected_Options[3] === index && (
                      <img className="h-5 w-5" src={tick}></img>
                    )}
                  </button>
                ))}
              </div>
            )}
            <button
              className="flex gap-0 space-x-0 mr-3"
              onClick={() => {
                disp(Options, 5);
                if (width < 1024) setShowPreview((prevState) => !prevState);
              }}
            >
              <img src={p13} alt="person" className=" w-5 h-5  ml-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const LanguagesComponent = ({
  val,
  setLanguages,
  add,
  setAdd,
  adding_index,
  thing,
}) => {
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState(1);
  const [editLang, setEditLang] = useState(Array(val.length + 1).fill(false));
  const callMe = (e) => {
    e.preventDefault();
    setLang(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value));
  };
  const removeItem = (language) => {
    setLanguages(val.filter((item) => item !== language));
  };
  const inputting = ({ lenni }) => (
    <>
      <div>
        <label>{`${thing} ${lenni}`}</label>
        <input
          onChange={callMe}
          value={lang}
          style={{ backgroundColor: col }}
          type="text"
          className="h-12 transition-all duration-300 w-full rounded px-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.getElementById("adding1").click();
            }
          }}
        />
        <div className="flex flex-col my-6">
          <label>Level</label>
          <div className="flex flex-row justify-between items-center">
            <input
              onChange={handleLevelChange}
              value={level}
              style={{ backgroundColor: col }}
              type="range"
              min="1"
              max="5"
              style={{
                backgroundColor: col,
                appearance: "none",
              }}
              className="user-select-none cursor-pointer rounded-lg w-5/12"
            />
            <label className="font-semibold text-lg w-5/12">
              {language_levels[level - 1]}
            </label>
          </div>
        </div>
      </div>
      <button
        id="adding1"
        className=" transition-all duration-300 hover:scale-95 rounded-lg mb-2 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-lg"
        onClick={() => {
          if (lang !== "") {
            const arr = Array(val.length + 1).fill(false);
            arr[-1] = true;
            setEditLang(arr);
            setLang("");
            const arrr = val;
            arrr[lenni - 1] = { name: lang, level };
            setLanguages(arrr);
            setAdd((prevAdd) => {
              const temp = [...prevAdd];
              temp[adding_index] = false;
              return temp;
            });
          }
        }}
      >
        <img src={p6} alt="person" className=" w-8 h-8  mr-5 " />
        Save
      </button>
    </>
  );
  const onDragEndd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedVal = Array.from(val);
    const [movedLanguage] = updatedVal.splice(sourceIndex, 1);
    updatedVal.splice(destinationIndex, 0, movedLanguage);

    const updatedEditLang = Array.from(editLang);
    const [movedEditState] = updatedEditLang.splice(sourceIndex, 1);
    updatedEditLang.splice(destinationIndex, 0, movedEditState);

    setLanguages(updatedVal);
    setEditLang(updatedEditLang);
  };
  useLayoutEffect(() => {
    if (val.length === 0) {
      setAdd((prevAdd) => {
        const temp = [...prevAdd];
        temp[adding_index] = true;
        return temp;
      });
    }
  }, [val]);

  return (
    <div className="space-y-7 bg-white mb-8">
      <div className="space-y-4 ">
        <DragDropContext onDragEnd={onDragEndd}>
          <Droppable droppableId={`${thing}s`}>
            {(provided, snapshot) => (
              <div
                className="space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {val.map((language, index) => (
                  <Draggable
                    key={index}
                    draggableId={`${thing}-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={
                          editLang[index]
                            ? "group mt-4  border  rounded-lg p-2 bg-white border-[#00000079] "
                            : "group mt-4  border  rounded-lg p-2 bg-white border-[#00000079] flex justify-between items-center "
                        }
                      >
                        {!editLang[index] ? (
                          <>
                            <img
                              {...provided.dragHandleProps}
                              src={drag_img}
                              className="w-6 h-6 mr sm:opacity-0 sm:group-hover:opacity-50 opacity-50 group-active:opacity-50"
                              alt="drag icon"
                            />
                            <label>
                              {`${thing} ${index + 1} : `} {language.name} -
                              Level: {language_levels[language.level - 1]}
                            </label>
                            <div>
                              <button
                                className=" mx-1"
                                onClick={() => {
                                  removeItem(language);
                                  setEditLang((prevEditLang) => {
                                    const newArr = prevEditLang;
                                    newArr.splice(index, 1);

                                    return newArr;
                                  });
                                }}
                              >
                                <img
                                  src={d}
                                  alt="person"
                                  className="transition duration-200 w-9 h-9 hover:scale-125 hover:opacity-55 "
                                />
                              </button>
                              <button
                                className="  px-2"
                                onClick={() => {
                                  setLang(language.name);
                                  setLevel(language.level);
                                  setEditLang((prevEditLang) => {
                                    const newArr = Array.from({
                                      length: val.length,
                                    }).fill(false);
                                    newArr[index] = true;
                                    newArr[val.length + 1] = true;
                                    return newArr;
                                  });
                                }}
                              >
                                <img
                                  src={edit}
                                  alt="person"
                                  className="transition duration-200 w-9 h-9 hover:scale-125 hover:opacity-55"
                                />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div key={index}>
                            <img
                              {...provided.dragHandleProps}
                              src={drag_img}
                              className="w-6 h-6 mr "
                            ></img>
                            {inputting({ lenni: index + 1 })}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          {!add[adding_index] && !editLang[val.length + 1] && (
            <button
              onClick={() => {
                setAdd((prevAdd) => {
                  const temp = [...prevAdd];
                  temp[adding_index] = !temp[adding_index];
                  return temp;
                });
              }}
              className=" transition-all duration-300 hover:scale-95 rounded-lg mb-2 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-md"
            >
              Add {thing}
            </button>
          )}
          {add[adding_index] &&
            !editLang[val.length + 1] &&
            inputting({ lenni: val.length + 1 })}
        </div>
      </div>
    </div>
  );
};

const InterestsComponent = ({
  val,
  setInterests,
  add,
  setAdd,
  adding_index,
}) => {
  const [inter, setInter] = useState("");
  const [editInter, setEditInter] = useState(Array(val.length + 1).fill(false));
  const callMe = (e) => {
    e.preventDefault();
    setInter(e.target.value);
  };

  const removeItem = (language) => {
    setInterests(val.filter((item) => item !== language));
  };
  const buttonRef = useRef();
  const inputting = ({ lenni }) => (
    <>
      <div>
        <label>{`Interest ${lenni}`}</label>
        <input
          onChange={callMe}
          value={inter}
          style={{ backgroundColor: col }}
          type="text"
          className="h-12 transition-all duration-300 w-full rounded px-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.getElementById("addingg").click();
            }
          }}
        />
      </div>
      <button
        className="transition-all duration-300 hover:scale-95 rounded-lg my-6 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-lg"
        id="addingg"
        onClick={() => {
          if (inter !== "") {
            const arr = Array(val.length + 1).fill(false);
            arr[-1] = true;
            setEditInter(arr);
            setInter("");
            const arrr = val;
            arrr[lenni - 1] = { name: inter };
            setInterests(arrr);

            setAdd((prevAdd) => {
              const newArr = prevAdd;
              newArr[adding_index] = false;
              return newArr;
            });
          }
        }}
      >
        <img src={p6} alt="person" className=" w-8 h-8  mr-5 " /> Save
      </button>
    </>
  );
  const onDragEndd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedVal = Array.from(val);
    const [movedLanguage] = updatedVal.splice(sourceIndex, 1);
    updatedVal.splice(destinationIndex, 0, movedLanguage);

    const updatedEditLang = Array.from(editInter);
    const [movedEditState] = updatedEditLang.splice(sourceIndex, 1);
    updatedEditLang.splice(destinationIndex, 0, movedEditState);

    setInterests(updatedVal);
    setEditInter(updatedEditLang);
  };
  useLayoutEffect(() => {
    if (val.length === 0) {
      setAdd((prevAdd) => {
        const newArr = prevAdd;
        newArr[adding_index] = true;
        return newArr;
      });
    }
  }, [val]);
  return (
    <div className="space-y-7 bg-white mb-8">
      <div className="space-y-4">
        <DragDropContext onDragEnd={onDragEndd}>
          <Droppable droppableId="languages">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {val.map((language, index) => (
                  <Draggable
                    key={index}
                    draggableId={`language-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={`group mt-4 border rounded-lg p-2 bg-white border-[#00000079] ${!editInter[index] ? 'flex' : ''}  justify-between items-center`}
                      >
                        {!editInter[index] ? (
                          <>
                            <img
                              {...provided.dragHandleProps}
                              src={drag_img}
                              className="w-6 h-6 mr sm:opacity-0 sm:group-hover:opacity-50 opacity-50 group-active:opacity-50"
                              alt="drag icon"
                            />
                            <label>
                              {`Interest ${index + 1} : `} {language.name}
                            </label>
                            <div>
                              <button
                                className=" px-2 "
                                onClick={() => {
                                  removeItem(language);
                                  setEditInter((prevEditLang) => {
                                    const newArr = prevEditLang;
                                    newArr.splice(index, 1);
                                    return newArr;
                                  });
                                }}
                              >
                                <img
                                  src={d}
                                  alt="person"
                                  className="transition duration-200 w-9 h-9 hover:scale-125 hover:opacity-55 "
                                />
                              </button>
                              <button
                                className=" rounded-lg px-2"
                                onClick={() => {
                                  setInter(language.name);
                                  setEditInter((prevEditLang) => {
                                    const newArr = Array.from({
                                      length: val.length,
                                    }).fill(false);
                                    newArr[index] = true;
                                    newArr[val.length + 1] = true;
                                    return newArr;
                                  });
                                }}
                              >
                                <img
                                  src={edit}
                                  alt="person"
                                  className="transition duration-200 w-9 h-9 hover:scale-125 hover:opacity-55  "
                                />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div key={index}>
                            <img
                              {...provided.dragHandleProps}
                              src={drag_img}
                              className="w-6 h-6 mr "
                            ></img>
                            {inputting({ lenni: index + 1 })}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          {!add[adding_index] && !editInter[val.length + 1] && (
            <button
              onClick={() => setAdd([add[0], !add[1]])}
              className=" transition-all duration-300 hover:scale-95 rounded-lg mb-2 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-lg"
            >
              Add Interest
            </button>
          )}
          {add[adding_index] &&
            !editInter[val.length + 1] &&
            inputting({ lenni: val.length + 1 })}
        </div>
      </div>
    </div>
  );
};
const EducationComponent = ({ val, func }) => {
  //institution name,degree,field of study, start date, graduation date,description,snapshotId(nah)

  return (
    <div className="bg-white mb-8">
      <div className="space-y-8">
        <div>
          <label>Institution Name</label>
          <input
            value={val}
            style={{ backgroundColor: col }}
            type="text"
            alt="name"
            className="h-12 transition-all duration-300 w-full rounded px-2"
          />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="w-1/2 flex flex-col ">
            <label>Degree</label>
            <input
              value={val}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300 rounded px-2"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label>Field of Study</label>
            <input
              value={val}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300  rounded px-2"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <label>Start Date</label>
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <select
                  value={val}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <label>Graduation Date</label>
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <select
                  value={val}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {grad_years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfessionalExperienceComponent = ({ val, func }) => {


  const [tillThisDay, setTillThisDay] = useState(false);

  return (
    <div className="bg-white mb-8">
      <div className="space-y-8">
        <div>
          <label>Company Name</label>
          <input
            value={val}
            style={{ backgroundColor: col }}
            type="text"
            alt="name"
            className="h-12 transition-all duration-300 w-full rounded px-2"
          />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="w-1/2 flex flex-col ">
            <label>City</label>
            <input
              value={val}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300 rounded px-2"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label>Post</label>
            <input
              value={val}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300  rounded px-2"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <label>Start Date</label>
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <select
                  value={val}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-1/2" st>
            <label>End Date</label>
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <select
                disabled={tillThisDay}
                  value={val}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                disabled={tillThisDay}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <label>till this day ?</label>
              <input onChange={
                (e) => {
                  setTillThisDay(e.target.checked);
                }
              } type="checkbox" className="h-10 w-10 shadow-none rounded-none"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



}
