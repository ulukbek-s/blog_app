import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Post.module.scss";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
      );
      const data = await res.json();

      setPost(data);
    }

    fetchData();
  }, [router.query.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.post_header}>
          <Link href="/">
            <button className={styles.go_back_btn} role="button">
              Go back
            </button>
          </Link>
          <h1>{post.title}</h1>
      </div>
      <div className={styles.post_content}>
        <img src={`https://picsum.photos/id/${router.query.id}/2000/800`} />
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostPage;
