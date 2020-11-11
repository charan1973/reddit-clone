import moment from "moment"

const TimeStamp = ({timestamp}) => {
    return <span className="grey">{moment(timestamp).fromNow()}</span>
}
// 2020-11-09T13:46:06.070Z

export default TimeStamp