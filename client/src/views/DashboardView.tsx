import { getAllProjects } from "@/services/ProjectApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/projects/ProjectCard";
import useAuth from "@/hooks/useAuth";
import ProjectDeleteModal from "@/components/projects/ProjectDeleteModal";

export default function DashboardView() {

    const { data: user, isLoading: isUserLoading } = useAuth()
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllProjects'],
        queryFn: getAllProjects,
        retry: 2
    })

    if(isLoading && isUserLoading) return 'Cargando...'
    if(isError) return `Ocurrió un error al cargar los proyectos: ${error.message}`;
    if(data && user){ 
        return (
            <>
                <h1 className="text-5xl font-black">Mis Proyectos</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
                        font-bold cursor-pointer transition-colors" to={'projects/create'}>
                        Nuevo Proyecto
                    </Link>
                </nav>

                {
                    (data.records.length === 0) 
                        ?   <p className="text-center py-20">
                                No hay proyectos aun: {''}
                                
                                <Link to={'/projects/create'} 
                                    className="text-fuchsia-500 font-bold">
                                    Crear Proyecto
                                </Link>
                            </p>
                        :   <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                                { 
                                    data.records.map((project) => 
                                        <ProjectCard key={project._id} 
                                            userID={user._id}
                                            project={project} />) 
                                }
                            </ul>
                    
                }
                <ProjectDeleteModal />
            </>
        )
    }
}
