import React, {useEffect, useState} from 'react'
import {SliderProps} from './slider.props'

const Slider = (
  {
    children,
    delay = 2500,
    spaceBetween = 0,
    slides = 1,
    infiniteLoop = false,
    pauseOnMouseOver = false,
    autoMove = true,
    indicatorActiveColor = 'info',
    indicator = true,
    navigation = true,
    prevNavigation,
    nextNavigation,
  }: SliderProps) => {

  const [currentIndex, setCurrentIndex] = React.useState(infiniteLoop ? slides : 0);
  const [length, setLength] = useState(children.length)
  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > slides)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [touchPosition, setTouchPosition] = useState(null)
  const [pause, setPause] = useState(false)

  const timeoutRef = React.useRef<any>(null);
  const ref = React.useRef<any>(null);

  useEffect(() => {
    setLength(children.length)
    setIsRepeating(infiniteLoop && children.length > slides)
  }, [children, infiniteLoop, slides])

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === slides || currentIndex === length) {
        setTransitionEnabled(true)
      }
    }
  }, [currentIndex, isRepeating, slides, length])

  // @ts-ignore
  useEffect(() => {
    if (!pause && autoMove) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => next(), delay
      );

      return () => {
        resetTimeout();
      };
    }
  }, [currentIndex, delay, pause]);

  useEffect(() => {
    if (ref.current) {
      for (const arg of ref.current.children) {
        arg.style.width = `calc((100% / ${slides}) - (${spaceBetween}px))`
        arg.style.marginLeft = `${spaceBetween / 2}px`
        arg.style.marginRight = `${spaceBetween / 2}px`
        arg.style.flexShrink = 0
        arg.style.flexGrow = 1
      }
    }
  }, [slides, spaceBetween])

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const next = () => {
    if (isRepeating || currentIndex < (length - slides) + 1) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false)
        setCurrentIndex(length)
      } else if (currentIndex === length + slides) {
        setTransitionEnabled(false)
        setCurrentIndex(slides)
      }
    }
  }

  const renderExtraPrev = () => {
    let output = []
    for (let index = 0; index < slides; index++) {
      output.push(children[length - 1 - index])
    }
    output.reverse()
    return output
  }

  const renderExtraNext = () => {
    let output = []
    for (let index = 0; index < slides; index++) {
      output.push(children[index])
    }
    return output
  }

  const handlePauseAutoMove = (state: boolean) => {
    if (pauseOnMouseOver) {
      setPause(state)
    }
  }

  return (
    <div className={'w-full flex flex-col'} onMouseOver={() => handlePauseAutoMove(true)} onMouseLeave={() => handlePauseAutoMove(false)}>
      <div className={'flex w-full relative'}>
        {(isRepeating || currentIndex > 0) && navigation && !prevNavigation ? (
          <button onClick={prev} className={'absolute top-1/2 z-10 w-12 h-12 rounded-full bg-white border border-grey-200 left-6'}>
            &lt;
          </button>
        ) : null}
        {prevNavigation && (isRepeating || currentIndex > 0) ? (
          <>
            {prevNavigation(prev)}
          </>
        ) : null}
        <div className={'overflow-hidden w-full h-full'}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
        >
          <div className={`flex transition ease-linear duration-300 shrink-0 grow w-full`}
               style={{
                 transform: `translateX(-${currentIndex * (100 / slides)}%)`,
                 transition: !transitionEnabled ? 'none' : undefined,
               }}
               onTransitionEnd={handleTransitionEnd}
               ref={ref}
          >
            {
              (length > slides && isRepeating) &&
              renderExtraPrev()
            }
            {children}
            {
              (length > slides && isRepeating) &&
              renderExtraNext()
            }
          </div>
        </div>
        {(isRepeating || currentIndex < (length - slides)) && navigation && !nextNavigation ? (
          <button onClick={next} className={"absolute top-1/2 z-10 w-12 h-12 rounded-full bg-white border border-grey-200 right-6"}>
            &gt;
          </button>
        ) : null}
        {nextNavigation && (isRepeating || currentIndex < (length - slides)) ? (
          <>
            {nextNavigation(next)}
          </>
        ) : null}
      </div>
      {indicator ? (
        <div className={'flex self-center items-center justify-center'}>
          {children.map((_: any, idx: number) => {
            const indicatorClass = `inline-block w-5 h-5 rounded-full cursor-pointer mt-20 mx-2 mb-0 ${infiniteLoop ? currentIndex === idx + slides ? `bg-${indicatorActiveColor}` : "bg-grey-100" : currentIndex === idx ? `bg-${indicatorActiveColor}` : "bg-grey-100"}`
            return (
              <div
                key={idx}
                className={indicatorClass}
                onClick={() => {
                  setCurrentIndex(infiniteLoop ? idx + 1 : idx);
                }}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Slider