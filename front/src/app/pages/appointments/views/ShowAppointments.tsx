import { useEffect, useState, memo, useCallback, ReactElement, LegacyRef } from 'react';
import { DAY_FORMAT, TIME_FORMAT } from '../enum/mapping'
import { showAppointViewStyle, borderNone } from './styls';
import MyDiv from '../../../components/MyDiv'

interface ShowAppoinmentsProps {
  currAppointmentsSelected: Array<string>,
  reservationRef: any
}
// 获取当前预约所有的时间段
const allAppointmentsSelected = (ref: any): Array<Array<number>> => {
  const selectedEl: Array<Array<any>> = []
  ref?.current?.childNodes.forEach((dayEl: any, day: number) => {
    dayEl.childNodes.forEach((hourEl: any, hour: number) => {
      if (hourEl.style.background === 'blue') {
        if (selectedEl[day]) {
          const last = selectedEl[day].pop()
          if ((hour - last[1]) === 1) {
            selectedEl[day].push([last[0], hour])
          } else {
            selectedEl[day].push(last)
            selectedEl[day].push([hour, hour])
          }
        } else {
          selectedEl[day] = [[hour, hour]]
        }
      }
    })
  })
  return selectedEl
}

// 清空按钮
const ClearButton = memo(({ updateAppointmensFormat, refs }: any): ReactElement => {
  const clearAppointments = () => {
    refs?.current?.childNodes?.forEach((dayEl: any) => {
      dayEl.childNodes.forEach((hourEl: any) => {
        if (hourEl.style.background === "blue") {
          hourEl.style.background = 'white'
        }
      })
    })
    updateAppointmensFormat()
  }
  return <button onClick={() => clearAppointments()} style={showAppointViewStyle.button}>清空</button>
})

// 快捷键按钮
const MakeAppointmentsShortCut = memo(({ updateAppointmensFormat, refs }: any): ReactElement => {
  const unoccupiedWeek = (dayRange: Array<number>, hourRange: Array<number>) => {
    const [sDay, eDay] = dayRange
    const [sHour, eHour] = hourRange
    refs?.current?.childNodes?.forEach((dayEl: any, index: number) => {
      if ((index >= sDay) && (index <= eDay)) {
        dayEl.childNodes.forEach((hourEl: any, i: number) => {
          if ((i >= sHour) && (i <= eHour)) {
            hourEl.style.background = 'blue'
          }
        })
      }
      updateAppointmensFormat()
    })
  }
  return <>
    <button onClick={() => unoccupiedWeek([0, 4], [18, 41])} style={showAppointViewStyle.button}>工作日黄金时间</button>
    <button onClick={() => unoccupiedWeek([5, 6], [18, 41])} style={showAppointViewStyle.button}>休息日黄金时间</button>
  </>
})

// 按钮集合模块
const ButtonViews = memo(({ refs, updateAppointmensFormat }: any): ReactElement => {
  return (
    <MyDiv styles={showAppointViewStyle.buttonPos}>
      <ClearButton refs={refs} updateAppointmensFormat={updateAppointmensFormat} />
      <MakeAppointmentsShortCut refs={refs} updateAppointmensFormat={updateAppointmensFormat} />
    </MyDiv>
  )
})

// 展示预约时间的模块
const ShowAppoinmentsView = memo(({ reservationRef, currAppointmentsSelected }: ShowAppoinmentsProps): ReactElement => {
  const [appointmensFormat, setAppointmensFormat] = useState(Array<string>)

  const updateAppointmensFormat = useCallback(() => {
    const selectedEl = allAppointmentsSelected(reservationRef)
    const appointmensStrFormat: Array<string> = selectedEl.map((hourRanges: any, day: number) => {
      const hourFormat = hourRanges.reduce(
        (format: string, currentValue: Array<number>) => `${format}, ${TIME_FORMAT[currentValue[0]]}-${TIME_FORMAT[currentValue[1] + 1]}`,
        `${TIME_FORMAT[hourRanges[0][0]]}-${TIME_FORMAT[hourRanges[0][1] + 1]}`
      );
      return `${DAY_FORMAT[day]}: ${hourFormat.slice(13)} \n`
    });
    setAppointmensFormat(appointmensStrFormat)
  }, [])

  useEffect(() => {
    updateAppointmensFormat()
  }, [currAppointmentsSelected])

  return (
    <MyDiv styles={showAppointViewStyle.main} >
      <MyDiv styles={borderNone}>
        {appointmensFormat ? '已选择时间段' : '可拖动鼠标选择时间段'}
        <ButtonViews refs={reservationRef} updateAppointmensFormat={updateAppointmensFormat} />
      </MyDiv>
      {appointmensFormat}
    </MyDiv>)
}
)

export default ShowAppoinmentsView