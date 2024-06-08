import { getAutenticatedUser } from "@/services/AuthApi";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getAutenticatedUser,
        refetchOnWindowFocus: false,
        retry: 1
    });

    return { data, isError, isLoading };
}
