import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

interface Post {
  id: number;
  title: string;
  body: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();

      setPosts(data);
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link
            href="/posts/[id]"
            as={`/posts/${post.id}`}
            key={post.id}
            className={styles.post}
          >
            <div>
              <h2 className={styles.post_title}>{post.title}</h2>
              <img src={`https://picsum.photos/id/${post.id}/500/200`}/>
              <p className={styles.post_content}>{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
