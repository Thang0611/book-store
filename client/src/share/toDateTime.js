export const TimestampToDateTime = (props) => {
  const timestamp = props // the timestamp you want to convert
  const date = new Date(timestamp)
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return (
    <span>
      {dateString} {timeString}
    </span>
  )
}
