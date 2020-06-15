
import {Toast} from 'native-base'
const ToastMsg = (msg,type,onClose=()=>{}) => {
    return Toast.show({
        text:msg,
        duration:2000,
        type:type,
        position:'bottom',
        onClose,
    })
}
export default ToastMsg