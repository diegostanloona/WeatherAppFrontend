import React, { useState } from 'react';

import ReactSwipeEvents from 'react-swipe-events';

import './SliderNavigation.css';

const SliderNavigation = props => {

    const [index, setIndex] = useState(0);

    let counter = 0;
    let isScrolling = false;

    window.onmousewheel = e => {
        if(!isScrolling){
            isScrolling = true;
            setTimeout(()=>{
                isScrolling = false;
            }, 5000);
            const direction = e.deltaY > 0 ? 1 : -1;
            props.onScroll(direction, () => {
                if (direction === 1) {
                    setIndex(index === 3 ? 0 : index + 1);
                } else {
                    setIndex(index === 0 ? 3 : index - 1);
                }
            });
        }
    }

    const swipeHandler = (e, originalX, originalY, endX, endY, deltaX, deltaY) => {
        const Xmovement = Math.abs(originalX - endX);
        const Ymovement = Math.abs(originalY - endY);
        if (Xmovement > 1 || Ymovement > 1) {
            if (Ymovement < Xmovement / 2) {
                let direction;
                if (originalX - endX > 25) {
                    direction = 1;

                } else if (originalX - endX < -25) {
                    direction = -1;
                }
                props.onScroll(direction, () => {
                    if (direction === 1) {
                        setIndex(index === 3 ? 0 : index + 1);
                    } else {
                        setIndex(index === 0 ? 3 : index - 1);
                    }
                });
            }
        }
    }

    const rotateByClick = newIndex => {
      if(newIndex !== index){
        const direction = newIndex-index;
        props.onScroll(direction, () => {
          setIndex(newIndex);
        });
      }
    }

    return (
        <ReactSwipeEvents onSwiped={swipeHandler}>
            <ul className="slider-navigation">
    			<li className={index===0?"active":undefined} onClick={() => {rotateByClick(0)}}><span>.</span></li>
    			<li className={index===1?"active":undefined} onClick={() => {rotateByClick(1)}}><span>.</span></li>
    			<li className={index===2?"active":undefined} onClick={() => {rotateByClick(2)}}><span>.</span></li>
    			<li className={index===3?"active":undefined} onClick={() => {rotateByClick(3)}}><span>.</span></li>
    		</ul>
        </ReactSwipeEvents>
    );

};

export default SliderNavigation;
