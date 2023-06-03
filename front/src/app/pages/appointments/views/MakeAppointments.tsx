
"use client";
import { useEffect, MouseEvent, memo, forwardRef, useCallback, ReactElement } from 'react';
import { makeAppointViewStyle } from './styls';
import MyDiv from '../../../components/MyDiv'

// 选择预约时间的模块
const SevenDaysHoursView = memo(forwardRef(({ setCurrAppointmentsSelected }: any, ref): ReactElement => {
  const reserveDivId = 'reserve-tab'
  const sevenDaysHours = new Array(7).fill(new Array(48).fill(0).map((v, i) => i))
  let appointmentsSelected: Array<any> = []
  let appointmentsFirstSelected: Array<number> = []

  // 鼠标按下正在选择预约时间的矩形框四点
  const currRectSelected = (e: MouseEvent): Array<number> => {
    const endSelected = e.target.dataset.position.split(',')
    const [[left, top], [right, bottom]] = [appointmentsFirstSelected, endSelected]
    const leftPoint: number = Math.min(left, right)
    const rightPoint: number = Math.max(left, right)
    const topPoint: number = Math.min(top, bottom)
    const bottomPoint: number = Math.max(top, bottom)
    return [leftPoint, rightPoint, topPoint, bottomPoint]
  }

  // 鼠标进入预约时间div的处理
  const mouseoverHandler = useCallback((e: any): void => {
    const [leftPoint, rightPoint, topPoint, bottomPoint] = currRectSelected(e)
    // appointmentsSelected by rect range
    if (e.buttons === 1 && (e.target.style.background !== "blue")) {
      ref?.current?.childNodes?.forEach((el: any) => {
        el?.childNodes?.forEach((e: any) => {
          const [day, hour] = e.dataset.position.split(',')
          if ((leftPoint <= day) && (day <= rightPoint) && (topPoint <= hour) && (hour <= bottomPoint) && (e.style.background !== "blue")) {
            appointmentsSelected.push(e)
            e.style.background = 'blue'
          }
        })
      });
    }
  }, [])

  // 鼠标出去预约时间div的处理
  const mouseoutHandler = useCallback(((e: any): void => {
    if (e.buttons === 1) {
      const [leftPoint, rightPoint, topPoint, bottomPoint] = currRectSelected(e)
      appointmentsSelected.forEach(e => {
        const [day, hour] = e.dataset.position.split(',')
        if ((leftPoint > day) || (day > rightPoint) || (topPoint > hour) || (hour > bottomPoint)) {
          e.style.background = 'white'
        }
      })
    }
  }), [])

  // 鼠标按下预约时间div的处理
  const mousedownHandler = useCallback(((e: any): void => {
    appointmentsFirstSelected = []
    appointmentsSelected = []
    if (e.buttons === 1) {
      e.target.style.background = 'blue'
      appointmentsFirstSelected = e.target.dataset.position.split(',')
    }
  }), [])

  useEffect(() => {
    // 鼠标弹起div的处理
    document.onmouseup = ((e: any): void => {
      if (e.target.dataset.id === reserveDivId && e.buttons === 0) {
        e.target.style.background = 'blue'
      }
      setCurrAppointmentsSelected(appointmentsSelected)
    })
  }, []);

  return (
    <MyDiv ref={ref} styles={makeAppointViewStyle.main}>
      {sevenDaysHours.map((day, j) =>
        <MyDiv key={`${j}`} styles={makeAppointViewStyle.day}>
          {day.map((i: number) => <MyDiv onMouseOver={mouseoverHandler} onMouseOut={mouseoutHandler} onMouseDown={mousedownHandler} position={`${j},${i}`} key={`${j},${i}`} id='reserve-tab' styles={makeAppointViewStyle.hour} />)}
        </MyDiv>
      )}
    </MyDiv>)
}))

export default SevenDaysHoursView