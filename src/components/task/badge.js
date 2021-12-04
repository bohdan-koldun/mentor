import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import slug from "slug"
import { Badge, Avatar, Tooltip } from "antd"

const TaskBadge = ({ src, count, title }) => {
  return (
    <Tooltip title={`${count} - ${title}`}>
      <Link to={`/task/${slug(title)}`}>
        <Badge count={count} title={title}>
          <Avatar shape="square" size="large" src={src} alt={title} />
        </Badge>
      </Link>
    </Tooltip>
  )
}

TaskBadge.propTypes = {
  src: PropTypes.node.isRequired,
}

export default TaskBadge
