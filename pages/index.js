import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Link from "next/link";
import { API_LIST_POSTS, getTimestamp, timeAgo } from "@/common/utils/utils";

const ListPostItem = ({ post }) => {
    const time = getTimestamp(post.published_at)
    const TimeAgo = timeAgo(time);

    return (
        <li className="news-item">
            <span className="__first-char">{post.title.charAt(0)}</span>
            <Link href={{
                pathname: '/p/[slug]',
                query: {
                    slug: `${post.transliterated}-${post.slug}`,
                    //slug_id: `${post.slug}`,
                },
            }}>
                <a className="__title">{post.title}</a>
            </Link>

            <br />
            <span className="__meta">
                <span className="by">by <a target="_blank" href={post.user.data.id}>{post.user.data.name}</a></span>
                <span className="time"> {TimeAgo} </span>
                <span className="comments-link"> | <a target="_blank" href={post.url + '#comments'}>open comments</a></span>
                <div style={{ display: 'none' }}>{post.contents_short}</div>
            </span>
        </li>
    )
}

function Home({ posts }) {
    //console.log(posts)
    return (
        <div className="list-news-wrap">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ul className="list-news">
                {posts.length > 0 && posts.map((post, index) => (
                    <ListPostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(API_LIST_POSTS + '?page=1&limit=20', {
        "mode": "cors",
        "credentials": "include"
    });
    const json = await res.json()
    const posts = await json.data

    return {
        props: {
            posts,
        },
        revalidate: 10,
    }
}

//export async function getServerSideProps() {
//    const res = await fetch(API_LIST_POSTS + '?page=1&limit=20', {
//        "mode": "cors",
//        "credentials": "include"
//    });
//    const json = await res.json()
//    const posts = await json.data
//
//
//    return {
//        props: {
//            posts,
//        },
//    }
//}

export default Home
