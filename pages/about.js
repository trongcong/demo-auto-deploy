import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import "normalize.css/normalize.css"
import Link from "next/link";

const API_POSTS = 'https://viblo.asia/api/posts/newest?page=1&limit=6';

//const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

function Home({posts}) {
    console.log(posts)
    //const [posts, setPosts] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(false);
    //const fetchData = async () => {
    //    try {
    //        setTimeout(async function () {
    //            let res = await fetch(API_POSTS)
    //            const posts = await res.json();
    //
    //            setError(false);
    //            setPosts(prevState => [...prevState, ...posts]);
    //            setLoading(false);
    //        }, 1000)
    //    } catch (e) {
    //        console.log(e)
    //        setError(true);
    //        setLoading(false);
    //    }
    //};
    //
    //useEffect(() => {
    //    fetchData();
    //}, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
<br />

                {/*{!error && loading && <div>Loading data...</div>}*/}
                {/*{error && <div>There was an error.</div>}*/}
                {/*{!error && posts.length > 0 && (*/}
                {posts.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>userId</th>
                                <th>id</th>
                                <th>title</th>
                                <th>body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((p, key) => (
                                <tr key={key}>
                                    {/*<td>{p.userId}</td>*/}
                                    {/*<td>{p.id}</td>*/}
                                    {/*<td>*/}
                                    {/*    <Link href={`/post/${p.id}`}>*/}
                                    {/*      <a>{p.title}</a>*/}
                                    {/*    </Link>*/}
                                    {/*</td>*/}
                                    {/*<td>{p.body}</td>*/}
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>
                                        <Link href={{
                                            pathname: '/p/[slug]',
                                            query: {
                                                slug: `${p.transliterated}-${p.slug}`,
                                                slug_id: `${p.slug}`,
                                            },
                                        }}>
                                          <a>{p.title}</a>
                                        </Link>
                                    </td>
                                    <td>{p.contents_short}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(API_POSTS, {
        "mode": "cors",
        "credentials": "include"
    });
    const json = await res.json()
    const posts = await json.data

    return {
        props: {
            posts,
        },
    }
}

//export async function getStaticProps() {
//    const res = await fetch(API_POSTS)
//const json = await res.json()
//const posts = await json.data
//
//    return {
//        props: {
//            posts,
//        },
//    }
//}

export default Home
