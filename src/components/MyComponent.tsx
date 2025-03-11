import {FC} from "react";
import { useQuery } from 'react-query';
import api from "../api/api.ts";

type PostProps = {
    id?: number,
    userId?: number,
    title?: string,
    body?: string,
}

const MyComponent: FC<PostProps> = () => {

    const { data } = useQuery('posts', async () => {
        const { data } = await api.get("/posts");
        return data;
    })

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data?.map((post: PostProps) => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MyComponent;

