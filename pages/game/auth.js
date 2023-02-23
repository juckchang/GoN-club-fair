import TextField from '@mui/material/TextField'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import axios from 'axios'

import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Rule() {
  const router = useRouter()
  const hoverStyle = {
    ':hover': {
      color: 'black',
      bgcolor: 'white'
    }
  }

  const textStyle = {
    'fontSize': '16px'
  }

  const [studentID, setStudentId] = useState('')
  const [studentIDError, setStudentIdError] = useState(0)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(0)

  useEffect(() => {
    const test = async () => {
      if (typeof localStorage.getItem('token') === 'string' && localStorage.getItem('token') !== '') {
        const req = await axios.post('/api/tokenAuth', { token: localStorage.getItem('token') })
        if (req.data.status) router.push('/game/start')
        else localStorage.removeItem('token')
      }
    }
    test()
  }, []);

  const handleClick = async e => {
    if (studentID !== '' && phone !== '') {
      const req = await axios.post('/api/userAuth', { studentID, phone })
      if (req.data.status) {
        const { token } = req.data
        localStorage.setItem('token', token)
        router.push('/game/start')
      } else {
        if (req.data.msg === 'duplicate') alert('학번 / 전화번호에 오류가 있습니다.')
        else if (req.data.msg === 'validate') alert('올바른 학번 / 전화번호를 입력해주세요.')
        else alert('오류발생.')
      }
    }
  }

  const handleStudentId = e => {
    const id = e.target.value
    if (/[0-9]{8}/.test(id) && id.length === 8) {
      setStudentIdError(0)
      setStudentId(id)
    } else {
      setStudentIdError(1)
      setStudentId('')
    }
  }

  const handlePhone = e => {
    const phone = e.target.value
    if (/010-[0-9]{4}-[0-9]{4}/.test(phone) && phone.length === 13) {
      setPhoneError(0)
      setPhone(phone)
    } else {
      setPhoneError(1)
      setPhone('')
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <TextField
          id="id"
          label="학번"
          type="text"
          variant="standard"
          color="primary"
          error={studentIDError}
          helperText="20231234"
          inputProps={{ style: { color: 'white' } }}
          labelProps={{ style: { color: 'white' } }}
          onChange={e => handleStudentId(e)}
          focused
        />
        <br />
        <TextField
          id="phonenumber"
          label="전화번호"
          type="text"
          variant="standard"
          color="primary"
          error={phoneError}
          helperText="010-1234-5678"
          inputProps={{ style: { color: 'white' } }}
          labelProps={{ style: { color: 'white' } }}
          onChange={e => handlePhone(e)}
          focused
        />
        <br />

        <Button color="primary" variant="text" startIcon={<KeyboardArrowRightIcon />} sx={hoverStyle} onClick={e => handleClick(e)}>
          <b style={textStyle}>시작하기</b>
        </Button>
      </main>

    </div>
  )
}
