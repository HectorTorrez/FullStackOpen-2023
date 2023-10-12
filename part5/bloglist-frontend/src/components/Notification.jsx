export const Notification = ({text, status, author = ''}) => {

    const green = {
        border: "1px solid green",
        backgroundColor: "white"
    }
    const red = {
        border: "1px solid red",
        backgroundColor: "white"
    }

  return (
    <>
        {
            status === 'success' ? <div style={green}><p style={{color: "green"}}>{`a new blog ${text} by ${author}`}</p></div> : <div style={red}><p style={{color: 'red'}}>{text}</p></div>
        }
    </>
  )
}