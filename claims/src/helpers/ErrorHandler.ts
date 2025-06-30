import axios from "axios"
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if(axios.isAxiosError(error)) {
        var err = error.response ;
        if(Array.isArray(err?.data.errors)) {
            for (let val of err.data.errors){
                toast.warning(val.description);
            }
        }
        
    }
}