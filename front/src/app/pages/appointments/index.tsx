
"use client";
import { useRef, useState, memo, ReactElement } from 'react';
import { DAY_FORMAT } from './enum/mapping'
import { pagesStyle, partitionStyle, weekStyle, headStyle } from './styles'
import ShowAppoinmentsView from './views/ShowAppointments';
import SevenDaysHoursView from './views/MakeAppointments';
import MyDiv from '../../components/MyDiv';


// 展示星期一，二.....的模块
const WeekView = memo((): ReactElement => {
    const sevenDays = new Array(7).fill(0).map((v, i) => i)
    return (
        <MyDiv styles={weekStyle.main}>
            {sevenDays.map((day) =>
                <MyDiv key={`${day}`} styles={weekStyle.text}>
                    {DAY_FORMAT[day]}
                </MyDiv>
            )}
        </MyDiv>
    )
})

// 展示小时划分的的模块
const DayPartitionView = memo((): ReactElement => {
    const dayHours = new Array(24).fill(0).map((v, i) => i)
    return (
        <MyDiv styles={partitionStyle.main}>
            <MyDiv key='week' styles={{ borderWidth: '0 0 1px 0' }}>
                <p style={partitionStyle.text}>00:00 - 12:00</p>
                <p style={partitionStyle.text}>12:00 - 24:00</p>
            </MyDiv>
            <MyDiv key='day-partition' styles={{ flexDirection: 'row', border: 0 }}>
                {dayHours.map((hour) => <MyDiv key={`hour,${hour}`} styles={partitionStyle.hourDiv}>{hour}</MyDiv>)}
            </MyDiv>
        </MyDiv>
    )
})

// 展示头部模块
const HeadView = memo((): ReactElement => {
    return (
        <MyDiv styles={headStyle.head} >
             <div style={headStyle.selected}></div><p style={headStyle.text}>已选</p>
             <div style={headStyle.notSelected}></div> <p  style={headStyle.text}>可选</p>
        </MyDiv>
    )
})

export default function Appointmens() {
    const reservationRef = useRef(null);
    let [currAppointmentsSelected, setCurrAppointmentsSelected] = useState(Array<any>);
    return (
        <>
            {/* head */}
            <HeadView />
           

            {/* medium */}
            <MyDiv styles={pagesStyle.medium} >
                <MyDiv styles={pagesStyle.textDiv}>星期/时间</MyDiv>
                <DayPartitionView />
            </MyDiv>

            {/* appointmens */}
            <MyDiv styles={pagesStyle.medium} >
                <WeekView />
                <SevenDaysHoursView ref={reservationRef} setCurrAppointmentsSelected={setCurrAppointmentsSelected} />
            </MyDiv>

            {/* bottom */}
            <ShowAppoinmentsView currAppointmentsSelected={currAppointmentsSelected} reservationRef={reservationRef} />
        </>
    )
}

