import { useSelector } from "react-redux"
import { Alert } from 'react-bootstrap'

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
  const variant = notification.color === 'red' ? 'danger' : 'success'
  return <Alert variant={variant} >{notification.content}</Alert>
}

export default Message