import ProfileForm from "@/components/profile/ProfileForm";
import useAuth from "@/hooks/useAuth"

export default function ProfileView() {

    const { data: user, isLoading } = useAuth();

    if(isLoading) return 'Cargando...'

    if(user) return <ProfileForm user={user} />
}
