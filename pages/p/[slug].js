import React from "react";
import { API_LIST_POSTS, API_POST } from "@/common/utils/utils";
import { markdownToHtml } from "@/common/lib/markdown";
import { useRouter } from 'next/router'
import Head from 'next/head'

const Post = ({ post, content }) => {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>

            <div dangerouslySetInnerHTML={{ __html: content }} />
            <p><strong>Link bài viết: </strong><code>{post.canonical_url}</code></p>
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(API_LIST_POSTS + '?page=1&limit=20', {
        "mode": "cors",
        "credentials": "include"
    });
    const json = await res.json()
    const posts = await json.data

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { slug: `${post.transliterated}-${post.slug}` },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths,
        fallback: true//'blocking'
    }
}

// This also gets called at build time
export async function getStaticProps(context) {
    let { params, query } = context
    let { slug } = params
    let slug_ids = slug.split('-')
    let slug_id = slug_ids[slug_ids.length - 1]

    const res = await fetch(`${API_POST + slug_id}`)
    const post = await res.json()

    let content = await markdownToHtml(post.contents || '');
    //console.log(content);

    return {
        props: {
            post,
            content
        },
        revalidate: 10,
    }
}

// export const getServerSideProps = async (context) => {
//     let { params, query } = context
//     let { slug } = params
//     let slug_ids = slug.split('-')
//     let slug_id = slug_ids[slug_ids.length - 1]

//     const res = await fetch(`${API_POST + slug_id}`)
//     const post = await res.json()

//     let content = await markdownToHtml(post.contents || '');
//     return {
//         props: {
//             post,
//             content,
//         },
//     }
// }

export default Post
