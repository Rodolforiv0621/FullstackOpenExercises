// import notificationContext from "./notificationContext"

const Notification = ({notification}) => {

  const style = notification === '' ? {display: "none"} : {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    
      <div style={style}>
        {notification}
      </div>
   
  )
}

export default Notification
