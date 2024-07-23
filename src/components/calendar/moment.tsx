"use client"
import React, { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const localizer = momentLocalizer(moment);

// Convert date to Malaysia time (GMT+0800)
const convertToMalaysiaTime = (date: Date) => {
  return moment(date).tz('Asia/Kuala_Lumpur').toDate();
};

// Format date to 'en-GB'
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kuala_Lumpur',
  }).format(date);
};

interface MyCalendarProps {
  events: any[]
}

const MyCalendar = ({ events }: MyCalendarProps) => {
  const [view, setView] = useState<View>(Views.MONTH);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate);
    },
    [setDate]
  );

  // Convert event times to Malaysia time
  const malaysiaEvents = events.map(event => ({
    ...event,
    start: convertToMalaysiaTime(event.start),
    end: convertToMalaysiaTime(event.end),
  }));

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="pb-2">
        <CardTitle>Schedule</CardTitle>
        <CardDescription>View Schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: '650px' }}>
          <Calendar
            date={date}
            onNavigate={onNavigate}
            localizer={localizer}
            events={malaysiaEvents} 
            view={view}
            defaultView={Views.MONTH}
            views={['month', 'agenda']}
            showMultiDayTimes
            style={{ height: 650 }}
            onView={handleOnChangeView}
            popup
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCalendar;
