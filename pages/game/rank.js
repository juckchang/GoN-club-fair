import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import HomeIcon from '@mui/icons-material/Home'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

  const [rank, setRank] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    const init = async () => {
      if (typeof localStorage.getItem('token') === 'string' && localStorage.getItem('token') !== '') {
        const req = await axios.post('/api/tokenAuth', { token: localStorage.getItem('token') })
        if (req.data.status) {
          setToken(localStorage.getItem('token'))
        }
      }
      
      const req = await axios.post('/api/getRank', { token: localStorage.getItem('token') })
      if (req.data.status) setRank(req.data.msg)
    }

    init()
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <TableContainer sx={{ width: 720 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">StudentID</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">RemainTime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rank.map((row) => (
                <TableRow
                  key={row.studentID}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: row.user ? 'rgb(20 238 83)' : ''
                  }}
                >
                  <TableCell style={{ width: 80 }} align="center">
                    {row.rank}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">{row.studentID}</TableCell>
                  <TableCell style={{ width: 160 }} align="center">{JSON.parse(row.solved).score}</TableCell>
                  <TableCell style={{ width: 160 }} align="center">{Math.floor(JSON.parse(row.solved).remainTime / 60) + ':' + Math.floor(JSON.parse(row.solved).remainTime % 60)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button color="primary" variant="text" startIcon={<HomeIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/")}>
          <b style={textStyle}>메인화면</b>
        </Button>
      </main>

    </div>
  )
}
