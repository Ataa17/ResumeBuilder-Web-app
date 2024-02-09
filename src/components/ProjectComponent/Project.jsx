import './project.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
function Project({ project }) {
    return (
        <>
            <div className="ProjectCard" >
                <img src={project.imgURL} className="Preview card-img-top" alt="Preview" style={{ margin: 'auto' }} />
                <div className="card-body">

                    <h1 className="card-title">{project.title}</h1>
                    <p className="card-text">{project.description}</p>
                    <div className='space-between' >
                        <button className="btn">Edit</button>
                        <button className='btn btn-danger'>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Project;