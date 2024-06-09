import AddMemberModal from "@/components/team/AddMemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"


export default function ProjectTeamView() {

    const navigate = useNavigate()
    const { projectID } = useParams()
    console.log(projectID)

    return (
        <>

            <h1 className="text-5xl font-black">Administrar Equipo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Administra el equipo de trabajo para este proyecto
            </p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                    onClick={() => navigate('?addMember=true')}
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3
                    text-white text-xl font-bold cursor-pointer transition-colors">
                    Agregar Colaborador
                </button>

                <Link to={`/projects/${projectID}`}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3
                    text-white text-xl font-bold cursor-pointer transition-colors">Volver al Proyecto
                </Link>
            </nav>

            <AddMemberModal projectID={projectID!} />
        </>
    )
}
