import * as React from "react"
import PropTypes from "prop-types"

import {  Typography } from "antd"

const TaskText = ({ text }) => {
  const textArr = (text || '').split('\n')
  return (
<Typography.Text>
  {
    textArr.map((item, i) => {
      return <Typography.Paragraph key={item[0]+i}>
        {item}
      </Typography.Paragraph>
    })
  }
</Typography.Text>
  )
}

TaskText.propTypes = {
  text: PropTypes.node.isRequired,
}

export default TaskText
