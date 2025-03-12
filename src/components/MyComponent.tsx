import {FC} from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../api/api";

type PostProps = {
    id?: number,
    userId?: number,
    title?: string,
    body?: string,
}

const fetchPosts = async ():Promise<PostProps[]> => {
    const { data } = await api.get("/posts");
    return data;
};

const addPost = async (newPost: Omit<PostProps, "id">) => {
    const { data } = await api.post("/posts", newPost);
    return data;
};

const MyComponent: FC<PostProps> = () => {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery<PostProps[]>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const addMutation = useMutation({
        mutationFn: addPost,
        onMutate: () => console.log("sending data..."),
        onSuccess: () => {
            console.log("post successfully added.");
            queryClient.invalidateQueries(["posts"]);
        },
        onError: (error) => console.error("error", error),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Posts</h1>
            <button
                onClick={() => addMutation.mutate({userId: 7, title: "New Post", body: "Hello"})}
            >
                Add Post
            </button>
            <ul>
                {data?.map((post: PostProps) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;