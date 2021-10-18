import "normalize.css/normalize.css"
import '../styles/globals.scss'
import 'nprogress/nprogress.css'
import Link from "next/link";
import { useRouter } from 'next/router';
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    let d = new Date();
    let y = d.getFullYear();
    let activeLink = (link) => {
        return router.pathname === link ? 'active' : 'link'
    }
    return (
        <div id="app">
            <div id="nav">
                <div className="container">
                    <div className="wrap">
                        <Link href="/">
                            <a className={activeLink('/')}>Home</a>
                        </Link>
                        <Link href="/about">
                            <a className={activeLink('/about')}>About</a>
                        </Link>
                        <Link href="/contact">
                            <a className={activeLink('/contact')}>Contact</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="main" className="container">
                <Component {...pageProps} />
            </div>
            <div id="footer">
                <div className="container">
                    <div className="wrap">
                        <div className="copyright">
                            &copy; {y} - Made by <a target="_blank" href="https://ntcde.com">NTC</a>, All Right Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyApp
