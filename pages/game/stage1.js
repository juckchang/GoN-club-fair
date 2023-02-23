import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useRouter } from 'next/router'
import { useState, useEffect, useRef} from 'react'

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
  
  const handleAnswer = async (e) => {
    const answer = e.target.value
    if (/GoN\{(.*)\}/.test(answer)) {
      const req = await axios.post('/api/user/submitAnswer', { token, answer, stage: 1 })
      if (req.data.status) {
        setAnswerError(false)
        setSolved(true)
        setScore(req.data.msg)
        setTimeout(()=>router.push('/game/stage2'), 2000)
      } else {
        setAnswerError(true)
      }
    }
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
  const [answerError, setAnswerError] = useState(false)
  const [solved, setSolved] = useState(false)
  const [score, setScore] = useState(0)

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const init = async () => {
      if (typeof localStorage.getItem('token') === 'string' && localStorage.getItem('token') !== '') {
        const req = await axios.post('/api/tokenAuth', { token: localStorage.getItem('token') })
        if (req.data.status) {
          setToken(localStorage.getItem('token'))
          const req = await axios.post('/api/user/getStage', { token: localStorage.getItem('token') })
          const { stage } = req.data
          if (stage !== 1) { // stage1에만 있는거
            router.push(`/game/stage${stage}`)
          } else {
            const req = await axios.post('/api/user/getStartTime', { token: localStorage.getItem('token') })
            const { createdAt } = req.data
            const date = new Date(createdAt)
            date.setMinutes(date.getMinutes() + 20)
            setTime(date)
          }
        }
        else {
          localStorage.removeItem('token')
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }
    init()
  }, []);

  useInterval(() => {
    const diffInMs = Math.abs((new Date()).getTime() - time.getTime())

    const diffInMin = Math.floor(diffInMs / 1000 / 60)
    const diffInSec = Math.floor((diffInMs / 1000) % 60)

    setDiffMin(diffInMin)
    setDiffSec(diffInSec)

    if (new Date() > time) router.push('/game/end')
  }, 1000)

  return (
    <div className={styles.container}>
      <Header />
      <nav>
        <Box 
          component="span" display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <span style={{ fontSize: '32px' }}>
            {diffMin.toString().padStart(2, '0')}:{diffSec.toString().padStart(2, '0')}
          </span>
        </Box>
      </nav>

      <main className={styles.main}>
        <p>스테이지1의 답은 <b>GoN{"{연습문제입니다}"}</b> 입니다.</p>
        <p>------------------------------------------------------------------------------------------</p>
        <TextField
          id="answer"
          label="답변"
          type="text"
          variant="standard"
          color="primary"
          error={answerError}
          helperText="틀린 답변입니다."
          inputProps={{ style: { color: 'white' } }}
          labelProps={{ style: { color: 'white' } }}
          onChange={e => handleAnswer(e)}
          focused
        />
        {solved ? <p style={{ color: '#ff4040', fontSize: '18px', fontWeight: 'bold' }}>정답입니다! {score}점을 획득하였습니다.</p> : '' }
      </main>

    </div>
  )
}
