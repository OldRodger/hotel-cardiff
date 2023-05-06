import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import Card from '../ui/Card';
import { Stack, Typography } from '@mui/material';


const ModalView = (props) => (
    <Card className={classes.modal}>
        {props.children}
    </Card>
);

const BackDrop = (props) => <div className={classes.backdrop} onClick={props.onClose}></div>

const portalLocation = document.querySelector('#modal');
function Modal(props) {

    const backDropView = ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalLocation)
    const modalView = ReactDOM.createPortal(<ModalView>
        <Stack direction={"row"} justifyContent={"flex-end"}>
            <span onClick={props.onClose} style={{ fontSize: 36, cursor: 'pointer' }} >&times;</span>
        </Stack>
        {props.children}
    </ModalView>, portalLocation)
    return (
        <>
            {backDropView}
            {modalView}
        </>
    );
}

export default Modal;