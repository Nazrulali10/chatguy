import {  MessageSquareQuote } from 'lucide-react'
export default function Sidebartop({onlineUsers}){
    return(
    <div className='sidebartop'>
        <div className='sidebartop1'>
        <label htmlFor='contact'><MessageSquareQuote size={30}/></label>
        <h1 id='contact'>Contacts</h1>
        </div>
        <p>Online: <span>{onlineUsers.length}</span></p>
    </div>);
}