import {FC} from "react";
import { PostProps } from '../types/types';
import { usePostsQuery, useAddPostMutation } from "../hooks";

const MyComponent: FC<PostProps> = () => {
    const postsQuery = usePostsQuery();
    const addMutation = useAddPostMutation();

    if (postsQuery?.isLoading) return <p>Loading...</p>;
    if (postsQuery?.error instanceof Error) return <p>Error: {postsQuery?.error.message}</p>;

    return (
        <div>
            <h1>Posts</h1>
            <button
                onClick={() => addMutation.mutate({userId: 7, title: "New Post", body: "Hello"})}
            >
                Add Post
            </button>
            <ul>
                {postsQuery?.data?.map((post: PostProps) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;