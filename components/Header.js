import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Header() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GoN Club Fair</title>
        <meta name="description" content="gon club fair" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
