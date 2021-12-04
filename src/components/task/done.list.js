import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import slug from "slug"
import { Image, Avatar, List } from "antd"
import { getImage } from "gatsby-plugin-image"

const DoneTaskList = ({ tasks }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={item => {
        const srcAvatar = getImage(item.task.sticker).images.fallback.src
        const srcPhoto = getImage(item.photo)?.images?.fallback?.src
        const date = new Date(item.date || item.shape)
        const description = [ `Дата: ${date.toLocaleDateString('uk-UA')}`,item.comment].filter(item => item)
       return( <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={srcAvatar} size="large" shape="square" />}
            title={<Link to={`/task/${slug(item.task.name)}`}>{item.task.name}</Link>}
            description={description.join('. ')}
          />
         {
           !!srcPhoto &&
           <Image
             height={50}
             src={srcPhoto}
           />
         }
        </List.Item>)
      }}
    />
  )
}

DoneTaskList.propTypes = {
  tasks: PropTypes.node.isRequired,
}

export default DoneTaskList
