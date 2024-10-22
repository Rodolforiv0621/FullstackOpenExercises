const Message = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  const messageStyle = {
    color: errorMessage.color,
    backgroundColor: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return <div style={messageStyle}>{errorMessage.message}</div>
}

export default Message