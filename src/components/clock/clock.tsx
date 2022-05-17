import React, { useEffect, useState, useCallback, FC } from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled, { keyframes } from "styled-components";

/**
 * A clock, the needles animated from -90 to the current time.
 */
export const Clock: FC = () => {
  const [dateReady, setDateReady] = useState<boolean>(false);
  const [minuteDegreeFrom, setMinuteDegreeFrom] = useState<number>(-90);
  const [hourDegreeFrom, setHourDegreeFrom] = useState<number>(-90);

  function get12HourTime(localTime: Date) {
    let hours = localTime.getHours();
    hours %= 12;
    localTime.setHours(hours);
    return localTime;
  }
  const [time, setTime] = useState<Date>(get12HourTime(new Date()));

  function getAngle(numberInPercent: number): number {
    return (numberInPercent / 100) * 360 - 90;
  }

  const getHourNeedlePosition = useCallback(() => {
    // A float with the current hour and the current minutes in percent
    // so the hour needle is pointing between the hour marks
    const hourAndMinutesInPercent =
      (parseFloat(
        `${time.getHours()}.${Math.floor((time.getMinutes() / 60) * 100)}`
      ) /
        12) *
      100;
    return getAngle(hourAndMinutesInPercent);
  }, [time]);

  const getMinuteNeedlePosition = useCallback(
    () =>
      // Divide by 60 hours
      getAngle((time.getMinutes() / 60) * 100),
    [time]
  );

  const [minuteDegreeTo, setMinuteDegreeTo] = useState<number>(
    getMinuteNeedlePosition()
  );

  const [hourDegreeTo, setHourDegreeTo] = useState<number>(
    getHourNeedlePosition()
  );

  const minuteKeyframe = keyframes`
  from {
    transform: rotate(${minuteDegreeFrom}deg);
  }
    to {
      transform: rotate(${minuteDegreeTo}deg);
    }
`;

  const hourKeyframe = keyframes`
  from {
    transform: rotate(${hourDegreeFrom}deg);
  }
    to {
      transform: rotate(${hourDegreeTo}deg);
    }
`;
  const Minutes = styled.div`
    animation: ${minuteKeyframe} 1s 1 forwards;
  `;
  const Hours = styled.div`
    animation: ${hourKeyframe} 1s 1 forwards;
  `;

  useEffect(() => {
    dayjs.extend(localizedFormat);
    // setHourDegreeFrom(getHourNeedlePosition() > 270 ? 270 : -90);
    setDateReady(true);
  }, [getHourNeedlePosition]);

  useEffect(() => {
    function updateTime() {
      // The needle should move from current spot to new spot
      // minuteDegreeTo is the the current position, and is
      // used as the from
      setMinuteDegreeFrom(minuteDegreeTo);
      setMinuteDegreeTo(getMinuteNeedlePosition());

      setHourDegreeFrom(hourDegreeTo);
      setHourDegreeTo(getHourNeedlePosition());
    }

    // Every minute, the time is updated and the needles move.
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setTime(new Date());
      updateTime();
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [
    getHourNeedlePosition,
    getMinuteNeedlePosition,
    hourDegreeTo,
    minuteDegreeTo,
    time
  ]);

  if (!dateReady) return <div />;

  return (
    <>
      <div className="clock clock-transition" aria-hidden>
        <div className="mark-12" />
        <div className="mark-3" />
        <div className="mark-6" />
        <div className="mark-9" />
        <Minutes className="needle" />
        <Hours className="needle" />
      </div>
      <div className="capitalize">
        {dayjs(time).locale(localeDa).format("dddd, MMMM D")}
      </div>
    </>
  );
};

export default Clock;
