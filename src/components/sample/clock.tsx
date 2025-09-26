import React, { useState, useEffect } from 'react';

const Clock = () => {

    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    const [nextSecond, setNextSecond] = useState(0);
    const [nextMinute, setNextMinute] = useState(0);
    const [nextHour, setNextHour] = useState(0);


    const [flipStates, setFlipStates] = useState({
        hours: false,
        minutes: false,
        seconds: false
    });


    useEffect(() => {
        const updateClock = () => {

            setFlipStates({
                seconds: false,
                minutes: false,
                hours: false
            });

            const now = new Date();
            const currentSecond = now.getSeconds();
            const currentMinute = now.getMinutes();
            const currentHour = now.getHours();

            // Check what changed to trigger animations
            const secondChanged = currentSecond !== second;
            const shouldAnimateMinute = secondChanged && currentSecond === 59;
            const shouldAnimateHour = shouldAnimateMinute && currentMinute === 59;


            if (secondChanged || shouldAnimateMinute || shouldAnimateHour) {

                setTimeout(() => {
                    setFlipStates({
                        seconds: secondChanged,
                        minutes: shouldAnimateMinute,
                        hours: shouldAnimateHour
                    });
                }, 10);
            }


            setSecond(currentSecond);
            setMinute(currentMinute);
            setHour(currentHour);


            const nextSecondValue = (currentSecond + 1) % 60;
            const nextMinuteValue = currentSecond === 59 ? (currentMinute + 1) % 60 : currentMinute;
            const nextHourValue = currentSecond === 59 && currentMinute === 59 ? (currentHour + 1) % 24 : currentHour;

            setNextSecond(nextSecondValue);
            setNextMinute(nextMinuteValue);
            setNextHour(nextHourValue);
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, [second]);




    const FlipDigit = (Nextvalue: number, value: number, isFlipping: boolean) => {
        const formatValue = (val: number) => val < 10 ? `0${val}` : `${val}`;

        return (
            <div className='relative w-[96px] h-[96px] rounded-lg '>

                <div className=' absolute top-0 flip-container w-full h-1/2 items-start z-10 rounded-lg'>
                    <div className={`clip-path-top-digit absolute z-10 class-test bg-component w-full rounded-lg font-mono text-6xl text-center  ${isFlipping ? 'animate-flip-top' : 'opacity-0'}`}>
                        {formatValue(value)}
                    </div>
                
                    <div className={`clip-path-bottom-digit absolute z-20 class-test bg-component w-full rounded-lg font-mono text-6xl text-center ${isFlipping ? 'animate-flip-bottom' : 'opacity-0'}`}>
                        {formatValue(Nextvalue)}
                    </div>
                </div>

                <div className='clip-path-top-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center '>
                    {isFlipping ? formatValue(Nextvalue) : formatValue(value)}
                </div>

                <div className='clip-path-bottom-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center'>
                    {formatValue(value)}
                </div>

            </div>
        )
    }

    return (
        <div className='relative flex items-center justify-center w-full h-full rounded-lg overflow-hidden'>
            <div className="relative z-10 flex items-center justify-center gap-8">
                {FlipDigit(nextHour, hour, flipStates.hours)}
                {FlipDigit(nextMinute, minute, flipStates.minutes)}
                {FlipDigit(nextSecond, second, flipStates.seconds)}
            </div>
        </div>
    );
};

export default Clock;