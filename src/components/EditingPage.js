import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import p1 from "../assets/chevron-down-svgrepo-com.svg";
import p2 from "../assets/fill-svgrepo-com.svg";
import arrow_up from "../assets/chevron-up-svgrepo-com.svg";
import p3 from "../assets/text-aa-bold-svgrepo-com copy.svg";
import drag_img from "../assets/drag-vertical-svgrepo-com.svg";
import p4 from "../assets/more-vertical-svgrepo-com.svg";
import p5 from "../assets/person-line-drawing-svgrepo-com.svg";
import p6 from "../assets/plus-large-svgrepo-com.svg";
import p8 from "../assets/download-minimalistic-svgrepo-com.svg";
import p9 from "../assets/more-vertical-svgrepo-comcopy.svg";
import p10 from "../assets/chevron-down-svgrepo-comcopy.svg";
import p11 from "../assets/text-square-svgrepo-com.svg";
import p12 from "../assets/menu-svgrepo-comcopy.svg";
import p13 from "../assets/full-screen-svgrepo-com.svg";
import preview from "../assets/preview.svg";
import arrow_back from "../assets/arrow-back.svg";
import { motion, AnimatePresence } from "framer-motion";

import tick from "../assets/tick.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import d from "../assets/delete.svg";
import edit from "../assets/edit.svg";
// problem to fix : when a new field is about to be added but decide to edit one , after editing the new field hides so new one must be made resulting in two and needing only one , gotta fix in all
// level in skills is fucked
//maybe initialise clicks based on if theres a null element or not
//max there can be one only null field this might help 
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
function monthToInt(month) {
  return monthes.indexOf(month) + 1;
}
function intToMonth(int) {
  return monthes[int - 1];
}
const fieldNamesEducation = [
  "institutionName",
  "degree",
  "startingMonth",
  "startingYear",
  "finishMonth",
  "finishYear",
  "description",
  "toPresent",
];
const fieldNamesProfessionalExp = [
  "companyName",
  "city",
  "startingMonth",
  "startingYear",
  "finishMonth",
  "finishYear",
  "description",
  "toPresent",
  "post",
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
const projectId = "00fcb077-9b3b-49b2-ab30-0d8a18041689";
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

export default function EditingPage({ auth }) {
  /*
creationDate: 1707752724185

id: "e9acbdc9-2f0f-42a4-bbcc-81480af4f9e0"

snapshot: {Interest: [], Formation: [], ProfessionalExp: [], Skill: [], Language: [], …}

title: "My first project"

userId: "e9acbdc9-2f0f-42a4-bbcc-81480af4f9e0" */

  /*
"templateName": "template1"
projid = a6c3168b-4dd6-4447-a449-0764ebe9ff26

*/

  const tempi = {
    projectId: "5e5f993e-343c-471c-b824-822345e25375",
    fieldValue: 5,
    fieldName: "level",
    entryName: "Language",
    tag: 0,
  };

  const [template, setTemplate] = useState("");

  useEffect(() => {
    // getting the template (Marine)
    async function getTemplate() {
      try {
        if (!auth) return;
        const templateResponse = await fetch(
          "http://localhost:8000/template/html/Marine",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );
        if (!templateResponse.ok) {
          console.error("template failed.");
        }
        await templateResponse.text().then((data) => {
          console.log("template retrieval:", data);
          setTemplate(data);
        });
      } catch (error) {
        console.error("Error during retrieval:", error);
      }
    }
    getTemplate();
  }, [auth]);

  // answer : project new then retrieve the template .
  // default templates obsidian and marine should be removed after the backend fully supports the creation of new templates
  //when creating a new project the template for it is not created
  // must get this done to then procceed to testing the manipulation of the template
  // no need to change the api to handle the order of stuff as the user will be saving the entire thing at once (will use the PUT /project/info API)
  //should routing be made with react or node
  useEffect(() => {
    // getting a list of all the projects
    async function allProjs() {
      try {
        if (!auth) return;
        const allProjects = await fetch("http://localhost:8000/project/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        });
        if (!allProjects.ok) {
          console.error("allProjects failed.");
        }
        await allProjects.json().then((data) => {
          console.log("allProjects Response:", data);
        });
      } catch (error) {
        console.error("Error during allProjects:", error);
      }
    }
    allProjs();
  }, [auth]);

  const [add, setAdd] = useState([true, true, true, true, true]);
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

  const [Experience, setExperience] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [Interests, setInterests] = useState([]);
  const [clicks, setClicks] = useState([1, 1, 1, 1, 1]);
  const [PersonalDetails, setPersonalDetails] = useState([
    "", //image
    "", //first name
    "", //last name
    "", //email
    "", //profile title
    "", //phone number
    "", //address
    "", //city
    "", //postal code
    "", //linkedin
    "", //about me
    "", //font
    "", //just to make page reboot the infos
  ]);
  const [changement, setChangement] = useState([
    false,
    1,
    "thing1",
    "ordered",
    "name",
  ]);
  const [selected_Options, setSelectedOptions] = useState([0, 0, 0, 0, 0]);
  const [showPreview, setShowPreview] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const pos_ref = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [data_retrieved, setData_retrieved] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // retrieve all info of proj to initialise the fieldsz

    async function retrieve() {
      try {
        if (!auth || dataFetched) return;

        const allProjects = await fetch(
          "http://localhost:8000/project/snapshot/00fcb077-9b3b-49b2-ab30-0d8a18041689",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );
        if (!allProjects.ok) {
          console.error("DataRetrieval failed.");
        }
        await allProjects.json().then((data) => {
          console.log("DataRetrieval Response:", data);
          setData_retrieved((prev) => data);
        });
        setDataFetched(true);
      } catch (error) {
        console.error("Error during DataRetrieval:", error);
      }
    }
    retrieve();
    console.log("tamem", data_retrieved);
    if (auth) {
      let educations = data_retrieved.Education; //array of edus
      let languages = data_retrieved.Language; //array of languages
      let interests = data_retrieved.Interest; //array of interests
      let skills = data_retrieved.Skill; //array of skills
      let professionalExps = data_retrieved.ProfessionalExp; //array of professionalExps
      setPersonalDetails((prev) => {
        const temp = [...prev];
        temp[1] = data_retrieved.firstName || "";
        temp[2] = data_retrieved.lastName || "";
        temp[3] = data_retrieved.email || "";
        temp[4] = data_retrieved.profileTitle || "";
        temp[5] = data_retrieved.phoneNumber || "";
        temp[6] = data_retrieved.address || "";
        temp[7] = data_retrieved.city || "";
        temp[8] = data_retrieved.postalCode || "";
        temp[9] = data_retrieved.reference || "";
        temp[10] = data_retrieved.aboutMe || "";
        return temp;
      });

      if (interests && interests.length) {
        let temp = [];
        for (let i = 0; i < interests.length; i++) {
          if (interests[i].name === null) continue;
          temp[interests[i].tag] = { name: interests[i].name };
        }
        setInterests((prev) => temp);
      }
      if (languages && languages.length) {
        let temp = [];
        for (let i = 0; i < languages.length; i++) {
          if (languages[i].name === null) continue;
          temp[languages[i].tag] = {
            name: languages[i].name,
            level: languages[i].level,
          };
        }
        setLanguages((prev) => temp);
      }
      if (skills && skills.length) {
        let temp = [];
        for (let i = 0; i < skills.length; i++) {
          if (skills[i].name === null) continue;
          temp[skills[i].tag] = { name: skills[i].name };
        }
        setSkills((prev) => temp);
      }

      if (educations && educations.length) {
        let temp = [];
        for (let i = 0; i < educations.length; i++) {
          if (educations[i].institutionName === null) continue;
          temp[educations[i].tag] = {
            one: educations[i].institutionName,
            two: educations[i].degree,
            fourth: intToMonth(educations[i].startingMonth),
            fifth: educations[i].startingYear,
            sixth: intToMonth(educations[i].finishMonth),
            seventh: educations[i].finishYear,
            eighth: educations[i].description,
            nine: educations[i].toPresent,
          };
        }
        setEducation((prev) => temp);
      }

      if (professionalExps && professionalExps.length) {
        let temp = [];
        for (let i = 0; i < professionalExps.length; i++) {
          if (professionalExps[i].companyName === null) continue;
          temp[professionalExps[i].tag] = {
            one: professionalExps[i].companyName,
            two: professionalExps[i].city,
            fourth: intToMonth(professionalExps[i].startingMonth),
            fifth: professionalExps[i].startingYear,
            sixth: intToMonth(professionalExps[i].finishMonth),
            seventh: professionalExps[i].finishYear,
            eighth: professionalExps[i].description,
            nine: professionalExps[i].toPresent,
            three: professionalExps[i].post,
          };
        }
        setExperience((prev) => temp);
      }
    }
  }, [auth, dataFetched]); //dependancy gotta be altered

  useEffect(() => {
    //getting the project infos
    async function getInfo() {
      try {
        if (!auth) return;
        const infos = await fetch(
          "http://localhost:8000/project/info/00fcb077-9b3b-49b2-ab30-0d8a18041689",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );
        if (!infos.ok) {
          console.error("infos failed.");
        }
        await infos.json().then((data) => {
          console.log("infos Response:", data);
        });
      } catch (error) {
        console.error("Error during infos:", error);
      }
    }
    getInfo();
  }, [PersonalDetails, auth]);

  useEffect(() => {
    // updating values to api
    if (changement[0] == true) {
      setChangement((prev) => {
        const temp = [...prev];
        temp[0] = false;
        return temp;
      });
      async function addField(kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: changement[2],
                fieldName: kind,
                entryName: "Snapshot",
                tag: changement[1],
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error(`modifyPersonalInfo failed.`);
          }
          await addFieldResponse.json().then((data) => {
            console.log(`modifyPersonalInfoResponse:`, data);
          });
        } catch (error) {
          console.error(`Error during modifyPersonalInfo:`, error);
        }
      }
      addField(changement[4]);
    }
  }, [changement]);

  const templateRef = useRef();

  useEffect(() => {
    // changing values in the template
    //id="h1">Your Name</h1>
    //<p id="profileTitle">Web Developer</p>
    let manipulatedTemplate = template.replace(
      /src="[^"]+"/,
      `src="${PersonalDetails[0]}"`
    );
    manipulatedTemplate = manipulatedTemplate.replace(
      /<h1 id="h1">[^<]+<\/h1>/,
      `<h1 id="h1">${PersonalDetails[1] + " " + PersonalDetails[2]} </h1>`
    );
    manipulatedTemplate = manipulatedTemplate.replace(
      /<p id="profileTitle">[^<]+<\/p>/,
      `<p id="profileTitle">${PersonalDetails[4]} </p>`
    );

    templateRef.current.innerHTML = manipulatedTemplate;
  }, [template, PersonalDetails]);

  /* // right here waiting omar to implement the Orders api change
  useEffect(() => {
    // updating field orders to api
    async function addField(kind,i) {
      try {
        if (!auth) return;
        const addFieldResponse = await fetch(
          "http://localhost:8000/project/info",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({
              projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
              fieldValue: i,
              fieldName: kind ,
              entryName: "Orders",
            }),
          }
        );
        if (!addFieldResponse.ok) {
          console.error(`modifyPersonalInfo failed.`);
        }
        await addFieldResponse.json().then((data) => {
          console.log(`modifyOrders:`, data);
        });
      } catch (error) {
        console.error(`Error during modifyOrders:`, error);
      }
    }

    for (let i = 0; i < 5; i++) {
      let parameter = "Education";
      if(items[i].id === "1") parameter = "Education";
      else if(items[i].id === "2") parameter = "Language";
      else if(items[i].id === "3") parameter = "Interest";
      else if(items[i].id === "4") parameter = "Skill";
      else if(items[i].id === "5") parameter = "ProfessionalExp";
      addField(parameter,i);
    }
  }, [items]);
*/
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPersonalDetails((prev) => {
        const temp = [...prev];
        temp[0] = imageUrl;
        return temp;
      });
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
    const temp = Array(Options.length).fill(false);
    temp[num - 1] = !state;
    setOptions((val) => temp);
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
          disp(true, 5);
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
        style={{ backgroundColor: col2 }}
        className={
          !showPreview
            ? "z-50 flex opacity-50 hover:opacity-100 hover:scale-110 duration-200 transition-all justify-center items-center  text-black  lg:hidden  rounded-[50%] w-14 h-14 right-10 bottom-10 fixed"
            : "hidden"
        }
        onClick={() => setShowPreview((prevState) => !prevState)}
      >
        <img src={preview} alt="person" className=" w-8 h-8  " />
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
        <div className="flex justify-between p-5 mx-auto">
          <button
            className="flex justify-center items-center rounded-xl  text-center px-2 ml-5 border-2 rounded-lg hover:scale-110 transition-all duration-200"
            style={{ borderColor: "#4A5CE4CC" }}
          >
            <img src={arrow_back} className=" h-8 w-8  "></img>
            <h1 className="font-bold">back to dashboard</h1>
          </button>
          <></>
        </div>
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
        <div className=" overflow-hidden sm:text-[16px] text-sm">
          <AnimatePresence>
            {disp_content[0] && (
              <motion.div
                initial={{ opacity: 1, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 1, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-row  px-8 justify-center items-center flex-grow-1 ">
                  <div className="flex justify-center gap-5  h-full">
                    <div
                      style={
                        PersonalDetails[0] == ""
                          ? { backgroundColor: col }
                          : {
                              backgroundImage: `url(${PersonalDetails[0]})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                      }
                      onClick={() =>
                        document.getElementById("imageInput").click()
                      }
                      className="sm:w-[150px] sm:h-[160px] w-[100px] h-[140px] rounded-[10px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-95"
                    >
                      {PersonalDetails[0] == "" && (
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
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-2 ">
                        <div className="flex-1 space-y-2">
                          <label>First name</label>
                          <br />
                          <input
                            value={PersonalDetails[1]}
                            onChange={(e) => {
                              const temp = [...PersonalDetails];
                              temp[1] = e.target.value;
                              setPersonalDetails((val) => temp);
                            }}
                            onBlur={(e) => {
                              setChangement(() => [
                                true,
                                1,
                                e.target.value,
                                "ordered",
                                "firstName",
                              ]);
                            }}
                            style={{ backgroundColor: col }}
                            type="text"
                            alt="name"
                            className=" sm:h-10 h-8 transition-all duration-300 w-full h-13 rounded px-2"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label>Last name</label>
                          <br />
                          <input
                            onBlur={(e) => {
                              setChangement(() => [
                                true,
                                2,
                                e.target.value,
                                "ordered",
                                "lastName",
                              ]);
                            }}
                            value={PersonalDetails[2]}
                            onChange={(e) => {
                              const temp = [...PersonalDetails];
                              temp[2] = e.target.value;
                              setPersonalDetails((val) => temp);
                            }}
                            style={{ backgroundColor: col }}
                            type="text"
                            alt="name"
                            className="  sm:h-10 h-8 transition-all duration-300 w-full rounded px-2"
                          />
                        </div>
                      </div>
                      <div className="sm:h-10 h-8  space-y-2">
                        <label>Email</label>
                        <br />
                        <input
                          onBlur={(e) => {
                            setChangement(() => [
                              true,
                              3,
                              e.target.value,
                              "ordered",
                              "email",
                            ]);
                          }}
                          value={PersonalDetails[3]}
                          onChange={(e) => {
                            const temp = [...PersonalDetails];
                            temp[3] = e.target.value;
                            setPersonalDetails((val) => temp);
                          }}
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
                  <div className="sm:h-10 h-8 mt-6 mx-8">
                    <label>Job title</label>
                    <br />
                    <input
                      onBlur={(e) => {
                        setChangement(() => [
                          true,
                          4,
                          e.target.value,
                          "ordered",
                          "profileTitle",
                        ]);
                      }}
                      value={PersonalDetails[4]}
                      onChange={(e) => {
                        const temp = [...PersonalDetails];
                        temp[4] = e.target.value;
                        setPersonalDetails((val) => temp);
                      }}
                      style={{ backgroundColor: col }}
                      type="text"
                      alt="name"
                      className="h-full transition-all duration-300 w-full rounded px-2"
                    />
                  </div>
                  <div className="sm:h-10 h-8 space-y-2 mx-8">
                    <label>Phone number</label>
                    <br />
                    <input
                      onBlur={(e) => {
                        setChangement(() => [
                          true,
                          5,
                          e.target.value,
                          "ordered",
                          "phoneNumber",
                        ]);
                      }}
                      value={PersonalDetails[5]}
                      onChange={(e) => {
                        const temp = [...PersonalDetails];
                        temp[5] = e.target.value;
                        setPersonalDetails((val) => temp);
                      }}
                      style={{ backgroundColor: col }}
                      type="text"
                      alt="name"
                      className="h-full transition-all duration-300 w-full rounded px-2"
                    />
                  </div>
                  <div className="sm:h-10 h-8 space-y-2 mx-8">
                    <label>Address</label>
                    <br />
                    <input
                      onBlur={(e) => {
                        setChangement(() => [
                          true,
                          6,
                          e.target.value,
                          "ordered",
                          "address",
                        ]);
                      }}
                      value={PersonalDetails[6]}
                      onChange={(e) => {
                        const temp = [...PersonalDetails];
                        temp[6] = e.target.value;
                        setPersonalDetails((val) => temp);
                      }}
                      style={{ backgroundColor: col }}
                      type="text"
                      alt="name"
                      className="h-full transition-all duration-300 w-full rounded px-2"
                    />
                  </div>
                  <div className=" flex-row flex  items-center justify-between gap-12 mx-8 max-w-[640px] space-y-2">
                    <div className="sm:h-10 h-8 space-y-2 flex-1">
                      <label>City</label>
                      <br />
                      <input
                        onBlur={(e) => {
                          setChangement(() => [
                            true,
                            7,
                            e.target.value,
                            "ordered",
                            "city",
                          ]);
                        }}
                        value={PersonalDetails[7]}
                        onChange={(e) => {
                          const temp = [...PersonalDetails];
                          temp[7] = e.target.value;
                          setPersonalDetails((val) => temp);
                        }}
                        style={{ backgroundColor: col }}
                        type="text"
                        alt="name"
                        className="h-full transition-all duration-300 w-full rounded px-2"
                      />
                    </div>
                    <div className="sm:h-10 h-8 space-y-1 flex-1 ">
                      <label>Postal code</label>
                      <br />
                      <input
                        onBlur={(e) => {
                          setChangement(() => [
                            true,
                            8,
                            e.target.value,
                            "ordered",
                            "postalCode",
                          ]);
                        }}
                        value={PersonalDetails[8]}
                        onChange={(e) => {
                          const temp = [...PersonalDetails];
                          temp[8] = e.target.value;
                          setPersonalDetails((val) => temp);
                        }}
                        style={{ backgroundColor: col }}
                        type="text"
                        alt="name"
                        className="h-full transition-all duration-300 w-full rounded px-2"
                      />
                    </div>
                  </div>
                  <div
                    className="   mx-8 max-w-[640px] space-y-2 "
                    id="linkedin"
                    style={{ display: "none" }}
                  >
                    <div className="sm:h-10 h-8 space-y-1 flex-1 ">
                      <label>LinkedIn Profile Link</label>
                      <br />
                      <input
                        onBlur={(e) => {
                          setChangement(() => [
                            true,
                            9,
                            e.target.value,
                            "ordered",
                            "reference",
                          ]);
                        }}
                        value={PersonalDetails[9]}
                        onChange={(e) => {
                          const temp = [...PersonalDetails];
                          temp[9] = e.target.value;
                          setPersonalDetails((val) => temp);
                        }}
                        style={{ backgroundColor: col }}
                        type="text"
                        alt="name"
                        className="sm:h-10 h-8 transition-all duration-300 w-full rounded px-2"
                      />
                    </div>
                  </div>
                  <div className="mx-8 max-w-[640px] space-y-2">
                    <div className=" space-y-1  ">
                      <label>About me</label>
                      <br />
                      <textarea
                        value={PersonalDetails[10]}
                        onChange={(e) => {
                          const temp = [...PersonalDetails];
                          temp[10] = e.target.value;
                          setPersonalDetails((val) => temp);
                          setChangement(() => [
                            true,
                            10,
                            e.target.value,
                            "ordered",
                            "aboutMe",
                          ]);
                        }}
                        style={{ backgroundColor: col, resize: "none" }}
                        type="text"
                        alt="name"
                        className=" h-24 p-1  sm:text-lg text-sm  w-full rounded px-2"
                      />
                    </div>
                  </div>
                  <br></br>
                  <button
                    className=" transition-all duration-300 hover:scale-95 mx-8 rounded-lg border-2 h-10 w-1/2 border-blue-700 max-w-[200px] flex justify-center items-center text-lg"
                    onClick={() => {
                      document.getElementById("linkedin").style.display =
                        "block";
                    }}
                  >
                    <img src={p6} alt="person" className=" w-8 h-8  mr-2 " />
                    <h4 className=" text-[16px] ">Add LinkedIn Profile</h4>
                  </button>
                </div>
                <br></br>
              </motion.div>
            )}
          </AnimatePresence>{" "}
        </div>

        <motion.div className="max-w-[670px] mx-auto">
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
                          key={character.id}
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
                          <div className=" overflow-hidden ">
                            <AnimatePresence>
                              {disp_content[parseInt(character.id)] && (
                                <motion.div
                                  initial={{ opacity: 1, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 1, height: 0 }}
                                  transition={{
                                    duration: width > 640 ? 0.4 : 0.3,
                                    ease: "easeIn",
                                  }}
                                >
                                  <div>
                                    {disp_content[parseInt(character.id)] &&
                                      (character.id === "1" ? (
                                        <ProfessionalExperienceComponent
                                          things={[
                                            "Institution Name",
                                            "Degree",
                                            "Field Of Study",
                                            "Education",
                                          ]}
                                          clickss={clicks}
                                          setClickss={setClicks}
                                          fNames={fieldNamesEducation}
                                          auth={auth}
                                          val={Education}
                                          setExp={setEducation}
                                          add={add}
                                          setAdd={setAdd}
                                          adding_index={3}
                                        />
                                      ) : character.id === "2" ? (
                                        <LanguagesComponent
                                          val={Languages}
                                          setLanguages={setLanguages}
                                          add={add}
                                          setAdd={setAdd}
                                          adding_index={0}
                                          thing="Language"
                                          auth={auth}
                                          clickss={clicks}
                                          setClickss={setClicks}
                                        />
                                      ) : character.id === "3" ? (
                                        <InterestsComponent
                                          val={Interests}
                                          setInterests={setInterests}
                                          add={add}
                                          setAdd={setAdd}
                                          adding_index={1}
                                          auth={auth}
                                          clickss={clicks}
                                          setClickss={setClicks}
                                        />
                                      ) : character.id === "4" ? (
                                        <LanguagesComponent
                                          val={skills}
                                          setLanguages={setSkills}
                                          add={add}
                                          adding_index={2}
                                          setAdd={setAdd}
                                          thing="Skill"
                                          auth={auth}
                                          clickss={clicks}
                                          setClickss={setClicks}
                                        />
                                      ) : (
                                        <ProfessionalExperienceComponent
                                          things={[
                                            "company Name",
                                            "City",
                                            "Post",
                                            "Experience",
                                          ]}
                                          fNames={fieldNamesProfessionalExp}
                                          val={Experience}
                                          setExp={setExperience}
                                          add={add}
                                          setAdd={setAdd}
                                          adding_index={4}
                                          auth={auth}
                                          clickss={clicks}
                                          setClickss={setClicks}
                                        />
                                      ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
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
        </motion.div>
      </div>
      <div
        className={
          width >= 1024
            ? !Options[4]
              ? "w-2/5 relative"
              : "w-full fixed z-1"
            : showPreview
            ? "w-full fixed z-1"
            : "hidden"
        }
        style={{ backgroundColor: col }}
      >
        <div className="h-screen overflow-y-auto">
          <div
            className="w-full h-14 absolute flex justify-between items-center fixed  "
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
          <div className="row-span-10 flex justify-center items-center mt-14 ">
            <div
              dangerouslySetInnerHTML={{ __html: template }}
              ref={templateRef}
            />
          </div>
          <div
            className={
              width >= 1024
                ? !Options[4]
                  ? " w-11/12 mx-auto absolute   rounded-xl h-12  max-w-[400px] right-0 bottom-0 flex justify-between items-center left-1/2 transform -translate-x-1/2 bottom-6 "
                  : "fixed w-11/12    rounded-xl h-12  max-w-[400px] bottom-6 left-1/2 transform -translate-x-1/2 flex justify-between items-center "
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
                className=" animate-fadeIn bg-white shadow-lg border  p-4 text-black space-y-2 rounded-md"
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
                      setChangement(() => [
                        true,
                        11,
                        font,
                        "ordered",
                        "fontFamily",
                      ]);
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
                className=" border bg-white shadow-lg p-4 text-black  space-y-2 rounded-md p-4"
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
                className=" border bg-white shadow-lg p-4 text-black  space-y-2 rounded-md"
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
                className="border  bg-white shadow-lg p-4 text-black  space-y-2 rounded-md"
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
                disp(Options[4], 5);
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
  auth,
  val,
  setLanguages,
  add,
  setAdd,
  adding_index,
  thing,
  clickss,
  setClickss,
}) => {
  const [changement, setChangement] = useState([
    false,
    1,
    "thing1",
    "ordered",
    "kind",
  ]); //changeoccured->tag->fieldvalue->fieldname->order->kind
  const choice = thing === "Language" ? 0 : 1;
  const [lang, setLang] = useState("");
  const [clicks, setClicks] = useState(clickss[choice]);
  const [level, setLevel] = useState(1);
  const [editLang, setEditLang] = useState(Array(val.length + 1).fill(false));
  const callMe = (e) => {
    e.preventDefault();
    setLang(e.target.value);
  };

  useEffect(() => {
    if (clicks == 1) {
      // modify the true here cause wheneevr opened it adds new
      setClickss((prev) => {
        const temp = [...prev];
        temp[choice] = 0;
        return temp;
      });
      setClicks((prev) => 0);
      async function addField() {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                entryName: thing,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("addField failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("addField Response:", data);
          });
        } catch (error) {
          console.error("Error during addField:", error);
        }
      }
      addField();
    }
  }, [clicks]);
  useEffect(() => {
    if (changement[0] == true) {
      setChangement((prev) => {
        const temp = [...prev];
        temp[0] = false;
        return temp;
      });
      async function addField(kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: changement[2],
                fieldName: kind,
                entryName: thing,
                tag: changement[1] - 1,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("modifyLang failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("modifyLang Response:", data);
          });
        } catch (error) {
          console.error("Error during modifyLang:", error);
        }
      }
      addField(changement[4]);
    }
  }, [changement]);
  useEffect(() => {
    if (changement[3] === "unordered") {
      // modify the true here cause wheneevr opened it adds new
      setChangement((prev) => {
        const temp = [...prev];
        temp[3] = "ordered";
        return temp;
      });
      async function addField(order, name, kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: name,
                fieldName: kind,
                entryName: thing,
                tag: order,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("modifyLang failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("modifyOrder Response:", data);
          });
        } catch (error) {
          console.error("Error during modifyOrder:", error);
        }
      }

      for (let i = 0; i < val.length; i++) {
        addField(i, val[i].name, "name");
      }
      for (let i = 0; i < val.length; i++) {
        addField(i, val[i].level, "level");
      }
    }
  }, [changement[3]]);

  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value));
  };
  const removeItem = (language) => {
    setLanguages(val.filter((item) => item !== language));
  };
  const inputting = ({ lenni }) => (
    <>
      <div className="sm:text-[16px] text-sm">
        <label>{`${thing} ${lenni}`}</label>
        <input
          onBlur={(e) => {
            setChangement(() => [
              true,
              lenni,
              e.target.value,
              "ordered",
              "name",
            ]);
          }}
          onChange={callMe}
          value={lang}
          maxLength="20"
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
              onChange={(e) => {
                handleLevelChange(e);
                setChangement(() => [
                  true,
                  lenni,
                  e.target.value,
                  "ordered",
                  "level",
                ]);
              }}
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
            setChangement(() => [true, lenni, lang, "ordered", "name"]);
            setChangement(() => [true, lenni, level, "ordered", "level"]);
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
    setChangement((prev) => {
      const temp = [...prev];
      temp[3] = "unordered";
      return temp;
    });
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
      // maybe make clicks 1 here cause inputting will appear after deletion of the only one left
    }
  }, [val]);

  return (
    <div className="space-y-7 bg-white mb-8 mx-1 sm:text-[16px] text-sm">
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
                            <label className="w-8/12 text-center">
                              {`${thing} ${index + 1} : `} {language.name} -
                              Level: {language_levels[language.level - 1]}
                            </label>
                            <div className="">
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
                                  className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55 "
                                />
                              </button>
                              <button
                                className="  sm:px-2"
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
                                  className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55"
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
                setClicks((prev) => 1);
                setClickss((prev) => {
                  const temp = [...prev];
                  temp[choice] = 1;
                  return temp;
                });

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
  auth,
  setInterests,
  add,
  setAdd,
  adding_index,
  clickss,
  setClickss,
}) => {
  const [changement, setChangement] = useState([
    false,
    1,
    "thing1",
    "ordered",
    "name",
  ]); //changeoccured->tag->fieldvalue->fieldname->order->kind
  const [clicks, setClicks] = useState(clickss[2]);
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
  useEffect(() => {
    if (clicks == 1) {
      setClickss((prev) => {
        const temp = [...prev];
        temp[2] = 0;
        return temp;
      });
      setClicks((prev) => 0);
      async function addField() {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                entryName: "Interest",
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("addField failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("addField Response:", data);
          });
        } catch (error) {
          console.error("Error during addField:", error);
        }
      }
      addField();
    }
  }, [clicks]);
  useEffect(() => {
    if (changement[0] == true) {
      // modify the true here cause wheneevr opened it adds new
      setChangement((prev) => {
        const temp = [...prev];
        temp[0] = false;
        return temp;
      });
      async function addField(kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: changement[2],
                fieldName: kind,
                entryName: "Interest",
                tag: changement[1] - 1,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("modifyLang failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("modifyInter Response:", data);
          });
        } catch (error) {
          console.error("Error during modifyInter:", error);
        }
      }
      addField(changement[4]);
    }
  }, [changement]);
  useEffect(() => {
    if (changement[3] === "unordered") {
      // modify the true here cause wheneevr opened it adds new
      setChangement((prev) => {
        const temp = [...prev];
        temp[3] = "ordered";
        return temp;
      });
      async function addField(order, name, kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: name,
                fieldName: kind,
                entryName: "Interest",
                tag: order,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("modifyLang failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("modifyOrder Response:", data);
          });
        } catch (error) {
          console.error("Error during modifyOrder:", error);
        }
      }

      for (let i = 0; i < val.length; i++) {
        addField(i, val[i].name, "name");
      }
    }
  }, [changement[3]]);

  const inputting = ({ lenni }) => (
    <>
      <div className="mx-1 sm:text-[16px] text-sm">
        <label>{`Interest ${lenni}`}</label>
        <input
          onBlur={(e) => {
            setChangement(() => [
              true,
              lenni,
              e.target.value,
              "ordered",
              "name",
            ]);
          }}
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
            setChangement(() => [true, lenni, inter, "ordered", "name"]);
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
    setChangement((prev) => {
      const temp = [...prev];
      temp[3] = "unordered";
      return temp;
    });
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
    <div className="space-y-7 bg-white mb-8 sm:text-[16px] text-sm">
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
                        className={`group mt-4 border rounded-lg p-2 bg-white border-[#00000079] ${
                          !editInter[index] ? "flex" : ""
                        }  justify-between items-center`}
                      >
                        {!editInter[index] ? (
                          <>
                            <img
                              {...provided.dragHandleProps}
                              src={drag_img}
                              className="w-6 h-6 mr sm:opacity-0 sm:group-hover:opacity-50 opacity-50 group-active:opacity-50"
                              alt="drag icon"
                            />
                            <label className="w-8/12 text-center">
                              {`Interest ${index + 1} : `} {language.name}
                            </label>
                            <div className="flex ">
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
                                  className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55 "
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
                                  className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55  "
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
              onClick={() => {
                setClicks((prev) => 1);
                setClickss((prev) => {
                  const temp = [...prev];
                  temp[2] = 1;
                  return temp;
                });
                setAdd([add[0], !add[1]]);
              }}
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

const ProfessionalExperienceComponent = ({
  val,
  func,
  auth,
  fNames,
  things,
  setExp,
  add,
  setAdd,
  adding_index,
  clickss,
  setClickss,
}) => {
  const [changement, setChangement] = useState([
    false,
    1,
    "thing1",
    "ordered",
    "name",
    "third_class",
  ]); //changeoccured->tag->fieldvalue->fieldname->order->kind
  const choice = things[3] == "Education" ? 3 : 4;
  const [clicks, setClicks] = useState(clickss[choice]);
  const [lang, setLang] = useState([
    "",
    "",
    "",
    "January",
    "2024",
    "January",
    "2024",
    "",
    false,
  ]);

  useEffect(() => {
    if (clicks == 1) {
      setClickss((prev) => {
        const temp = [...prev];
        temp[choice] = 0;
        return temp;
      });
      setClicks((prev) => 0);
      async function addField() {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                entryName:
                  things[3] == "Education" ? "Education" : "ProfessionalExp",
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("addField failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log("addField Response:", data);
          });
        } catch (error) {
          console.error("Error during addField:", error);
        }
      }
      addField();
    }
  }, [clicks]);
  useEffect(() => {
    if (changement[0] == true) {
      // modify the true here cause wheneevr opened it adds new
      setChangement((prev) => {
        const temp = [...prev];
        temp[0] = false;
        return temp;
      });
      async function addField(kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: changement[2],
                fieldName: kind,
                entryName:
                  things[3] == "Education" ? "Education" : "ProfessionalExp",
                tag: changement[1] - 1,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error(`modify${things[3]} failed.`);
          }
          await addFieldResponse.json().then((data) => {
            console.log(`modify${things[3]} Response:`, data);
          });
        } catch (error) {
          console.error(`Error during modify${things[3]}:`, error);
        }
      }
      addField(changement[4]);
    }
  }, [changement]);
  useEffect(() => {
    if (changement[3] === "unordered") {
      setChangement((prev) => {
        const temp = [...prev];
        temp[3] = "ordered";
        temp[5] = "";
        return temp;
      });
      async function addField(order, name, kind) {
        try {
          if (!auth) return;
          const addFieldResponse = await fetch(
            "http://localhost:8000/project/info",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
              body: JSON.stringify({
                projectId: "00fcb077-9b3b-49b2-ab30-0d8a18041689",
                fieldValue: name,
                fieldName: kind,
                entryName:
                  things[3] == "Education" ? "Education" : "ProfessionalExp",
                tag: order,
              }),
            }
          );
          if (!addFieldResponse.ok) {
            console.error("modifyOrder/whole failed.");
          }
          await addFieldResponse.json().then((data) => {
            console.log(`modifyOrder/whole Response:`, data);
          });
        } catch (error) {
          console.error("Error during modifyOrder/whole:", error);
        }
      }
      let parametre = "yay";
      let tempo = [
        "one",
        "two",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "eighth",
        "nine",
        "three",
      ];
      if (changement[5] == "first_class") {
        for (let i = 0; i < val.length; i++) {
          for (let j = 0; j < 9; j++) {
            if (things[3] == "Education" && j == 8) continue;
            if (tempo[j] == "fifth" || tempo[j] == "seventh") {
              parametre = parseInt(val[i][tempo[j]]);
            } else if (tempo[j] == "fourth" || tempo[j] == "sixth") {
              parametre = monthToInt(val[i][tempo[j]]);
            } else {
              parametre = val[i][tempo[j]];
            }
            addField(i, parametre, fNames[j]);
          }
        }
      } else if (changement[5] == "second_class") {
        for (let i = 0; i < 9; i++) {
          if (things[3] == "Education" && i == 8) continue;

          if (tempo[i] == "fifth" || tempo[i] == "seventh") {
            parametre = parseInt(val[changement[1] - 1][tempo[i]]);
          } else if (tempo[i] == "fourth" || tempo[i] == "sixth") {
            parametre = monthToInt(val[changement[1] - 1][tempo[i]]);
          } else {
            parametre = val[changement[1] - 1][tempo[i]];
          }

          addField(changement[1] - 1, parametre, fNames[i]);
        }
      }
    }
  }, [changement[3]]);
  const handleLangChange = (e, i) => {
    if (i == 8) {
      setLang((prevLang) => {
        const arr = [...prevLang];
        arr[i] = !arr[i];
        return arr;
      });
      return;
    }
    setLang((prevLang) => {
      const arr = [...prevLang];
      arr[i] = e.target.value;
      return arr;
    });
  };

  const [editExp, setEditExp] = useState(Array(val.length + 1).fill(false));
  const callMe = (e) => {
    e.preventDefault();
    setExp(e.target.value);
  };

  const removeItem = (language) => {
    setExp(val.filter((item) => item !== language));
  };
  const inputting = ({ lenni }) => (
    <div className="bg-white mb-8 mx-1 sm:text-[16px] text-sm">
      <div className="space-y-8">
        <div>
          <label>{things[0]}</label>
          <input
            onBlur={(e) => {
              setChangement(() => [
                true,
                lenni,
                e.target.value,
                "ordered",
                fNames[0],
                "",
              ]);
            }}
            onChange={(e) => handleLangChange(e, 0)}
            value={lang[0]}
            style={{ backgroundColor: col }}
            type="text"
            alt="name"
            className="h-12 transition-all duration-300 w-full rounded px-2"
          />
        </div>
        <div
          className="gap-4 justify-between"
          style={{ display: things[3] === "Education" ? "block" : "flex" }}
        >
          <div
            className="w-[46%] flex flex-col "
            style={{ width: things[3] == "Education" ? "100%" : "46%" }}
          >
            <label>{things[1]}</label>
            <input
              onBlur={(e) => {
                setChangement(() => [
                  true,
                  lenni,
                  e.target.value,
                  "ordered",
                  fNames[1],
                  "",
                ]);
              }}
              onChange={(e) => handleLangChange(e, 1)}
              value={lang[1]}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300 rounded px-2 w-full"
            />
          </div>
          <div
            className="w-[46%] flex flex-col"
            style={{ display: things[3] === "Education" ? "none" : "flex" }}
          >
            <label>{things[2]}</label>
            <input
              onBlur={(e) => {
                if (things[3] == "Experience")
                  setChangement(() => [
                    true,
                    lenni,
                    e.target.value,
                    "ordered",
                    fNames[8],
                    "",
                  ]);
              }}
              onChange={(e) => handleLangChange(e, 2)}
              value={lang[2]}
              style={{ backgroundColor: col }}
              type="text"
              alt="name"
              className="h-12 transition-all duration-300  rounded px-2"
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-4 gap-2">
          <div className="w-1/2">
            <label>Start Date</label>
            <div className="flex justify-between sm:gap-4 gap-2">
              <div className="w-1/2">
                <select
                  onChange={(e) => {
                    setChangement(() => [
                      true,
                      lenni,
                      monthToInt(e.target.value),
                      "ordered",
                      fNames[2],
                      "",
                    ]);

                    handleLangChange(e, 3);
                  }}
                  value={lang[3]}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  onChange={(e) => {
                    setChangement(() => [
                      true,
                      lenni,
                      parseInt(e.target.value),
                      "ordered",
                      fNames[3],
                      "",
                    ]);
                    handleLangChange(e, 4);
                  }}
                  value={lang[4]}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <label>End Date</label>
            <div className="flex justify-between sm:gap-4 gap-2">
              <div className="w-1/2">
                <select
                  onChange={(e) => {
                    setChangement(() => [
                      true,
                      lenni,
                      monthToInt(e.target.value),
                      "ordered",
                      fNames[4],
                      "",
                    ]);
                    handleLangChange(e, 5);
                  }}
                  value={lang[5]}
                  disabled={lang[8]}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {monthes.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  onChange={(e) => {
                    setChangement(() => [
                      true,
                      lenni,
                      parseInt(e.target.value),
                      "ordered",
                      fNames[5],
                      "",
                    ]);
                    handleLangChange(e, 6);
                  }}
                  value={lang[6]}
                  disabled={lang[8]}
                  style={{ backgroundColor: col, appearance: "none" }}
                  className="h-12 transition-all duration-300 w-full rounded px-2"
                >
                  {grad_years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" flex gap-2 mt-2 mx-auto items-center justify-center bg-gray-100 rounded-3xl">
              <label className=" text-sm sm:text-sm">till this day ?</label>
              <input
                onChange={(e) => {
                  setChangement(() => [
                    true,
                    lenni,
                    e.target.checked,
                    "ordered",
                    fNames[7],
                    "",
                  ]);
                  handleLangChange(e, 8);
                }}
                checked={lang[8]}
                type="checkbox"
                className="sm:h-5 sm:w-5 w-4 h-4 text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
              ></input>
            </div>
          </div>
        </div>
        <div>
          <label>Description</label>
          <textarea
            onBlur={(e) => {
              setChangement(() => [
                true,
                lenni,
                e.target.value,
                "ordered",
                fNames[6],
                "",
              ]);
            }}
            onChange={(e) => handleLangChange(e, 7)}
            value={lang[7]}
            style={{ backgroundColor: col, resize: "none" }}
            alt="name"
            className=" p-1 h-20 sm:text-lg text-sm  w-full rounded px-2"
          />
        </div>
        <button
          className=" transition-all duration-300 hover:scale-95 rounded-lg mb-2 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-md"
          onClick={() => {
            if (lang[0] !== "") {
              //update all with same one as unordered..
              setChangement(() => [
                false,
                lenni,
                lang[0],
                "unordered",
                "name",
                "second_class",
              ]);
              const arr = Array(val.length + 1).fill(false);
              arr[-1] = true;
              setEditExp(arr);
              const arrr = val;
              arrr[lenni - 1] = {
                one: lang[0],
                two: lang[1],
                three: lang[2],
                fourth: lang[3],
                fifth: lang[4],
                sixth: lang[5],
                seventh: lang[6],
                eighth: lang[7],
                nine: lang[8],
              };
              setExp(arrr);
              setAdd((prevAdd) => {
                const temp = [...prevAdd];
                temp[adding_index] = false;
                return temp;
              });
              setLang([
                "",
                "",
                "",
                "January",
                "2024",
                "January",
                "2024",
                "",
                false,
              ]);
            }
          }}
        >
          {`Add ${things[3]}`}
        </button>
      </div>
    </div>
  );

  const onDragEndd = (result) => {
    if (!result.destination) {
      return;
    }
    setChangement((prev) => {
      const temp = [...prev];
      temp[5] = "first_class";
      temp[3] = "unordered";
      return temp;
    });
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedVal = Array.from(val);
    const [movedLanguage] = updatedVal.splice(sourceIndex, 1);
    updatedVal.splice(destinationIndex, 0, movedLanguage);

    const updatedEditLang = Array.from(editExp);
    const [movedEditState] = updatedEditLang.splice(sourceIndex, 1);
    updatedEditLang.splice(destinationIndex, 0, movedEditState);

    setExp(updatedVal);
    setEditExp(updatedEditLang);
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
    <div>
      <div className="space-y-7 bg-white mb-8">
        <div className="space-y-4 ">
          <DragDropContext onDragEnd={onDragEndd}>
            <Droppable droppableId={`${things[3]}s`}>
              {(provided, snapshot) => (
                <div
                  className="space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {val.map((language, index) => (
                    <Draggable
                      key={index}
                      draggableId={`${things[3]}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className={
                            editExp[index]
                              ? "group mt-4  border  rounded-lg p-2 bg-white border-[#00000079] "
                              : "group mt-4  border  rounded-lg p-2 bg-white border-[#00000079] flex justify-between items-center "
                          }
                        >
                          {!editExp[index] ? (
                            <>
                              <img
                                {...provided.dragHandleProps}
                                src={drag_img}
                                className="w-6 h-6 mr sm:opacity-0 sm:group-hover:opacity-50 opacity-50 group-active:opacity-50"
                                alt="drag icon"
                              />
                              <label className="w-8/12 text-center">
                                {`${things[3]} ${index + 1} : `} {language.one}
                              </label>
                              <div>
                                <button
                                  className=" mx-1"
                                  onClick={() => {
                                    removeItem(language);
                                    setEditExp((prevEditLang) => {
                                      const newArr = prevEditLang;
                                      newArr.splice(index, 1);
                                      return newArr;
                                    });
                                  }}
                                >
                                  <img
                                    src={d}
                                    alt="person"
                                    className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55 "
                                  />
                                </button>
                                <button
                                  className="sm:px-2"
                                  onClick={() => {
                                    setLang([
                                      language.one,
                                      language.two,
                                      language.three,
                                      language.fourth,
                                      language.fifth,
                                      language.sixth,
                                      language.seventh,
                                      language.eighth,
                                      language.nine,
                                    ]);
                                    setEditExp((prevEditLang) => {
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
                                    className="transition duration-200 sm:w-9 sm:h-9 w-7 h-7 hover:scale-125 hover:opacity-55"
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
        </div>
        <div>
          {!add[adding_index] && !editExp[val.length + 1] && (
            <button
              onClick={() => {
                setClickss((prev) => {
                  const temp = [...prev];
                  temp[choice] = 1;
                  return temp;
                });
                setClicks((prev) => 1);
                setAdd((prevAdd) => {
                  const temp = [...prevAdd];
                  temp[adding_index] = !temp[adding_index];
                  return temp;
                });
              }}
              className="transition-all duration-300 hover:scale-95 rounded-lg mb-2 border-2 h-10 w-1/2 border-blue-700 max-w-[130px] flex justify-center items-center text-md"
            >
              Add {things[3]}
            </button>
          )}
        </div>
        {add[adding_index] &&
          !editExp[val.length + 1] &&
          inputting({ lenni: val.length + 1 })}
      </div>
    </div>
  );
};
