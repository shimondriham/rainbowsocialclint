import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'

export default function Emojy (props) {
  const [ text, setText ] = useState('')

  function handleOnEnter (text) {
    console.log('enter', text)
    props.setEmojy(text)

  }

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
    />
  )
}