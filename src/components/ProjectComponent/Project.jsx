import './project.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function Project({project}){
    return(
        <>
          <div className="ProjectCard" >
                <img src={project.imgURL} className="Preview card-img-top" alt="Preview" style={{margin:'auto'}}/>
                <div className="card-body">
                  
                    <h1 className="card-title">{project.title}</h1>
                    <p className="card-text">{project.description}</p>
                    <button className="btn">View</button>
                </div>
            </div>
        </>
    );
}
export default Project;