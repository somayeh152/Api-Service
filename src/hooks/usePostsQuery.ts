import {useQuery} from "react-query";
import {PostProps} from "../types/types";
import api from "../api/api.ts";

const fetchPosts = async ():Promise<PostProps[]> => {
    const { data } = await api.get("/posts");
    return data;
};

export const usePostsQuery = () => {
    return useQuery({
        queryKey: [''],
        queryFn: fetchPosts,
    })
}