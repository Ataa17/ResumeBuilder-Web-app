import "./project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Project({ project ,projs, setProjs, auth}) {
  useEffect(() => {
    import("./project.css");
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);
  return (
    <>
      <div className="ProjectCard">
        <img
          src={project.imgURL}
          className="Preview card-img-top"
          alt="Preview"
          style={{ margin: "auto", cursor: "pointer" }}
          onClick={() => {
            window.location.href = `/edit/${project.projectId}`;
          }}
        />
        <div className="card-body">
          <h1 className="card-title">{project.title}</h1>
          <p className="card-text">{project.description}</p>
          <p className="card-text text-xs">created on {project.date}</p>
          <div className="space-between">
            <button
              className="btn"
              onClick={() => {
                window.location.href = `/edit/${project.projectId}`;
              }}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={
                async ()=>{ 
                    const deleteResponse = await fetch(`http://localhost:8000/project`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json',
                      },
                        body: JSON.stringify({
                            projectId: project.projectId,
                        }),
                    });
                    console.log(deleteResponse);
                    if(deleteResponse.ok){
                        setProjs((prev)=>{
                            const temp = prev.filter((p)=>p.projectId!==project.projectId);
                            return temp;
                        });
                    }

                }
            }>
              <FontAwesomeIcon icon={faTrash} />
            
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Project;
