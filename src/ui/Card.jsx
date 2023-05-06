import classes from './Card.module.css';

function Card({className, children}) {
    return (
        <figure className={`${classes.card} ${className}`}>
            {children}
        </figure>
    );
}

export default Card;