import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

export default function Rule() {
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

  useEffect(() => localStorage.removeItem('token'), [])


  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        끗!
        <Button color="primary" variant="text" startIcon={<MilitaryTechIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/game/rank")}>
          <b style={textStyle}>순위보기</b>
        </Button>
      </main>

    </div>
  )
}
