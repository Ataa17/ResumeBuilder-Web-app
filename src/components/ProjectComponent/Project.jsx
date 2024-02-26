import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Project({ project, projs, setProjs, auth }) {
  const navigate = useNavigate();



  return (
    
    <div
    className="w-72  rounded-md p-4 m-5 bg-white transition duration-200 ring-2 border border-blue-700 "
    style={{
      boxShadow: '0 0 0 0px rgba(0, 0, 255, 0.5)',
      transition: 'box-shadow 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '2px 4px 2px 1px rgba(0, 0, 255, 0.5)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0px rgba(0, 0, 255, 0.5)'; }}
  >
        <img
          src={project.imgURL}
          className="Preview cursor-pointer mx-auto"
          alt="Preview"
          onClick={() => {
            navigate(`/edit/${project.projectId}`);
          }}
        />
        <div className="card-body">
          <h1 className="card-title">{project.title}</h1>
          <p className="card-text">{project.description}</p>
          <p className="card-text text-xs">created on {project.date}</p>
          <div className="flex justify-between">
            <button
              className="rounded-lg px-3 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={() => {
                navigate(`/edit/${project.projectId}`);
              }}
            >
              Edit
            </button>
            <button
              className="p-2 rounded-lg bg-red-500 hover:bg-white text-white hover:text-red-500"
              onClick={async () => {
                const deleteResponse = await fetch(
                  `http://localhost:8000/project`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: auth,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      projectId: project.projectId,
                    }),
                  }
                );
                console.log(deleteResponse);
                if (deleteResponse.ok) {
                  setProjs((prev) => {
                    const temp = prev.filter(
                      (p) => p.projectId !== project.projectId
                    );
                    return temp;
                  });
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
  );
}

export default Project;
