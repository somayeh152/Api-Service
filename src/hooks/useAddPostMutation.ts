import {useMutation, useQueryClient} from 'react-query';
import { PostProps } from '../types/types';
import api from "../api/api";

const addPost = async (newPost: Omit<PostProps, "id">) => {
    const { data } = await api.post("/posts", newPost);
    return data;
};

export const useAddPostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPost,
        onMutate: () => console.log("sending data..."),
        onSuccess: () => {
            console.log("post successfully added.");
            queryClient.invalidateQueries(["posts"]);
        },
        onError: (error) => console.error("error", error),
    })
}