import * as React from "react"
import PropTypes from "prop-types"
import { Badge, Avatar } from "antd"

const TaskBadge = ({ src, count, title }) => {
  return (
    <Badge count={count} title={title}>
      <Avatar shape="square" size="large" src={src} />
    </Badge>
  )
}

TaskBadge.propTypes = {
  src: PropTypes.node.isRequired,
}

export default TaskBadge
