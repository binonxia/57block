
"use client";
import Appointmens from "./pages/appointments";

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      margin: '20px',
      alignContent: 'center',
      justifyContent: 'center'

    }}>
      <Appointmens />
    </main>
  )
}

