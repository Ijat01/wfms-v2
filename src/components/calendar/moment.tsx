'use client'
import React, { useCallback, useState } from 'react'
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/en-gb' // Import British English locale
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Set moment to use British English locale
moment.locale('en-gb')

const localizer = momentLocalizer(moment)

// Define props interface
interface MyCalendarProps {
  events: any[];
}

const MyCalendar = ({ events }: MyCalendarProps) => { 
  const [view, setView] = useState<View>(Views.MONTH)

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView)
  }

  const [date, setDate] = useState(new Date())
  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate)
    },
    [setDate]
  )

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="pb-2">
        <CardTitle>Schedule</CardTitle>
        <CardDescription>View Schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: "650px" }}>
          <Calendar
            date={date}
            onNavigate={onNavigate}
            localizer={localizer}
            events={events} 
            view={view}
            defaultView={Views.MONTH} // Ensure this is an array
            views={['month', 'agenda']}
            showMultiDayTimes
            style={{ height: 650 }}
            onView={handleOnChangeView}
            popup
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default MyCalendar
