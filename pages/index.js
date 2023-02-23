import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Image from 'next/image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookIcon from '@mui/icons-material/Book';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import { Button } from '@mui/material'
import { useRouter } from "next/router"
import { bgcolor } from '@mui/system';

export default function Home() {
  const router = useRouter()
  const handleClick = (e, path) => {
    router.push(path)
  }

  const hoverStyle = {
    ':hover': {
      color: 'black',
      bgcolor: 'white'
    }
  }

  const textStyle = {
    'fontSize': '16px'
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Image 
          src="/gonLogo.png"
          width={250}
          height={250}
        />
        <h1>GoN Club Fair - 미궁탈출</h1>
        <div>
          
          <Button color="primary" variant="text" startIcon={<PlayArrowIcon />} sx={hoverStyle} onClick={e=>handleClick(e, "/game/auth")}>
            <b style={textStyle}>시작하기</b>
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color="primary" variant="text" startIcon={<BookIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/rule")}>
            <b style={textStyle}>규칙보기</b>
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color="primary" variant="text" startIcon={<MilitaryTechIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/game/rank")}>
            <b style={textStyle}>순위보기</b>
          </Button>
        </div>

      </main>
    </div>
  )
}
