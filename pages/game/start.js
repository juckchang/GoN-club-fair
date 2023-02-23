import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import FlagIcon from '@mui/icons-material/Flag'
import Box from '@mui/material/Box'
import axios from 'axios'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

export default function Rule() {
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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

  const [token, setToken] = useState('')
  const [diffMin, setDiffMin] = useState(0)
  const [diffSec, setDiffSec] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const test = async () => {
      if (typeof localStorage.getItem('token') === 'string' && localStorage.getItem('token') !== '') {
        const req = await axios.post('/api/tokenAuth', { token: localStorage.getItem('token') })
        if (req.data.status) {
          setToken(localStorage.getItem('token'))
          const req = await axios.post('/api/user/getStartTime', { token: localStorage.getItem('token') })
          const { createdAt } = req.data
          const date = new Date(createdAt)
          date.setMinutes(date.getMinutes() + 20)
          setTime(date)
        } else {
          localStorage.removeItem('token')
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }
    test()
  }, []);

  useInterval(() => {
    const diffInMs = Math.abs((new Date()).getTime() - time.getTime())

    const diffInMin = Math.floor(diffInMs / 1000 / 60)
    const diffInSec = Math.floor((diffInMs / 1000) % 60)
    setDiffMin(diffInMin)
    setDiffSec(diffInSec)
  }, 1000)

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Box component="span" sx={{ p: 5, paddingLeft: 30, paddingRight: 30, border: '1px dashed grey' }}>
          <span style={{ fontSize: '48px' }}>{(new Date() > time) ? "-" : ""} {diffMin.toString().padStart(2, '0')}:{diffSec.toString().padStart(2, '0')}</span>
        </Box>
        <br />
        {(new Date() < time) ? 
          <Button color="primary" variant="text" startIcon={<FlagIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/game/stage1")}>
            <b style={textStyle}>Stage1</b>
          </Button>
        : 
          <Button color="primary" variant="text" startIcon={<MilitaryTechIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/game/rank")}>
            <b style={textStyle}>순위보기</b>
          </Button>
        }
      </main>

    </div>
  )
}
