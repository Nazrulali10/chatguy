import Lottie from 'lottie-react'
import chatanimation from '../Animation - 1742111540487.json'
import introanimation from '../Animation - 1741859297558.json'
export default function Chatanimation(){
    return(
        <Lottie animationData={chatanimation} loop={true} />
    );
}
export function Introanimation(){
    return(
        <Lottie animationData={introanimation} loop={true} />
    );
}