import classes from './Slider.module.css';
import image1 from '../assets/images/hero-1.jpg';
import image2 from '../assets/images/hotel-img.jpg';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';

const IMAGES = [
    image1,
    image2
]

function Slider() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        setTimeout(forwardSlide, 10000);
    }, [active])

    const changeSlide = value => {
        setActive(value);
    }

    const forwardSlide = () => {
        let newIndex = active + 1;
        if (newIndex === IMAGES.length)
            newIndex = 0;

        changeSlide(newIndex);
    }

    return (
        <figure className={classes.slider}>
            <div className={classes.imgBox}>
                <img src={IMAGES[active]} alt="slider image" />
            </div>
            <Stack direction="row" justifyContent="center" gap={1} className={classes.dots}>
                {IMAGES.map((_, idx) => {
                    const classValue = `${classes.dot} ${idx === active ? classes.active : ''}`
                    return <span key={idx} className={classValue} onClick={() => changeSlide(idx)}></span>;
                })}
            </Stack>
        </figure>
    );
}

export default Slider;