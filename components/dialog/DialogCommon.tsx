import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogCommon(
    { open, handleClose, children, title, action }:
        {
            open: boolean;
            handleClose: () => void;
            children?: React.ReactNode;
            title?: string;
            action?: React.ReactNode;
        }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title &&
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
            }
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            {action &&
                <DialogActions>
                    {action}
                </DialogActions>
            }
        </Dialog>
    )
}