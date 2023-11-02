import React from 'react'
import './ChatWidget.css'
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
const ChatWidget = () => {
  return (
    <>
    
    <Widget 
    
    title="Live Chat"
    subtitle="Contact operator for any query"
    showCloseButton={true}
    
    />
    </>
  )
}

export default ChatWidget