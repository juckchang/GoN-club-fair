import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'

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
    'font': '16px'
  }
  
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Box component="span" sx={{ p: 20, border: '1px dashed grey' }}>
          <p>1. 제한시간은 20분이며, 순서대로 나오는 미궁문제를 풀어서 탈출해주시면 됩니다!</p> 
          <p>2. 모든 문제의 답은 <span style={{fontWeight: 'bold'}}>GoN{'{~~~}'}</span> 입니다.</p>
          <p>&nbsp;&nbsp;&nbsp;ex) 문제의 답이 1234 일 경우, <span style={{ fontWeight: 'bold' }}>GoN{'{1234}'}</span>로 입력해주세요. </p>
          <p>3. 점수제로 순위를 매기며, 동점의 경우 남은 시간을 비교하여 순위를 매깁니다.</p>
          <p>4. 상위 3명한테는 상품이 지급될 예정입니다.</p>
          <p>5. 인터넷 검색은 자유입니다.</p>
          <p>6. 해킹등을 통하여 점수를 취득하셔도 됩니다.</p>
          <p>7. 해당 사이트의 소스코드는 <a rel="noreferrer" target="_blank" href="https://github.com/juckchang/GoN-club-fair" style={{ color: 'rgb(30 200 235)' }}>여기</a>에 공개되어있습니다.</p>
        </Box>
        <br/>
        <Button color="primary" variant="text" startIcon={<HomeIcon />} sx={hoverStyle} onClick={e => handleClick(e, "/")}>
          <b style={textStyle}>메인화면</b>
        </Button>
      </main>

    </div>
  )
}
