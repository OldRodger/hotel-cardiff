import classes from './Banner.module.css';
import SearchFormHome from "./SearchFormHome";

function Banner(props) {
    const style = {
        backgroundImage: `linear-gradient(
            rgba(0,0,0,.5),
            rgba(0,0,0,.5)
        ), url(${props.bgImage})`
    }

    return (
        <>
            <header className={classes.banner} style={style}>
                <figure className={classes.textbox} >
                    {props.children}
                </figure>
            </header>
            <SearchFormHome />
        </>
    );
}

export default Banner;