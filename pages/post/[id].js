import { useRouter } from 'next/router'

const Post = ({post}) => {

    return <div><p>Post: {post.title}</p></div>
}

//export async function getStaticPaths() {
//    // Call an external API endpoint to get posts
//    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//    const posts = await res.json()
//
//    // Get the paths we want to pre-render based on posts
//    const paths = posts.map((post) => ({
//        params: { id: post.id },
//    }))
//
//    // We'll pre-render only these paths at build time.
//    // { fallback: false } means other routes should 404.
//    return { paths, fallback: false }
//}

// This also gets called at build time
//export async function getStaticProps({params}) {
//    // params contains the post `id`.
//    // If the route is like /posts/1, then params.id is 1
//    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//    const post = await res.json()
//
//    // Pass post data to the page via props
//    return {
//        props: {post},
//        // Re-generate the post at most once 10 second
//        // if a request comes in
//        revalidate: 10,
//    }
//}

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()

    return {
        props: {
            post,
        },
    }
}

export default Post
