import { useParams } from "react-router-dom";


const UpdateStudent = () => {
    const {id} = useParams()
    return (
        <div>
            UpdateStudent {id}
        </div>
    );
};

export default UpdateStudent;