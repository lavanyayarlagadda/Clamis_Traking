import {
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import { ButtonComponent } from "./Button";
import { HelpOutline } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface ConfirmPopupProps {
    open: boolean;
    title: string;
    message: string;
    buttonText?: string;
    gifSrc?: string;
    onClose: () => void;
    onConfirm?: () => void;
    buttonText2?: string;
    onClick?: () => void;
    isLoading?: boolean;
    popUpClosed?: boolean;
    noButton?: boolean;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
    open,
    title,
    message,
    buttonText,
    onClose,
    buttonText2,
    onClick,
    isLoading,
    popUpClosed,
    noButton
}) => {
    const location = useLocation();

    const popUpClose = () => {
        onClose();
    };

    const confirmClick = () => {
        if (onClick) {
            onClick();
        }
    };

    useEffect(() => {
        if (open) {
            popUpClose();
        }
    }, [location]);

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={() => {
                if (popUpClosed) {
                    onClose();
                }
            }}
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                    textAlign: "center",
                    padding: "24px",
                    maxWidth: "400px",
                },
            }}
        >
            <DialogContent>
                <HelpOutline sx={{ color: "#0073B7", width: 40, height: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                {buttonText && (
                    <ButtonComponent
                        label={buttonText}
                        color="inherit"
                        onClick={onClose}
                        loading={isLoading && noButton}
                        sx={{
                            borderRadius: "100px",
                            border: "1px solid #E5E5E5",
                            color: "#0A0A0A",
                            px: 2,
                            py: 1,
                        }}
                    />
                )}
                {buttonText2 && (
                    <ButtonComponent
                        label={buttonText2}
                        color="primary"
                        onClick={confirmClick}
                        loading={isLoading}
                        sx={{
                            borderRadius: "100px",
                            backgroundColor: "#0073B7",
                            color: "white",
                            px: 2,
                            py: 1,
                            "&:hover": {
                                backgroundColor: "#0063a3",
                            },
                        }}
                    />
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPopup;
