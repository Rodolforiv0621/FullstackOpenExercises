import { useSelector } from "react-redux"

const Message = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.content) {
    return null
  }
  const messageStyle = {
    color: notification.color,
    backgroundColor: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return <div style={messageStyle} className="error">{notification.content}</div>
}

export default Message