import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Menu } from "antd"
import { AppstoreOutlined, UnorderedListOutlined, PieChartTwoTone } from "@ant-design/icons"

const Header = ({ location }) => {
  return (
    <header>
      <Menu selectedKeys={[location?.pathname]} mode="horizontal">
        <Menu.Item key="/" icon={<UnorderedListOutlined />}>
          <Link to="/">Список</Link>
        </Menu.Item>
        <Menu.Item key="/tasks" icon={<AppstoreOutlined />}>
          <Link to="/tasks">Завдання</Link>
        </Menu.Item>
        <Menu.Item key="/stats" icon={<PieChartTwoTone />}>
          <Link to="/stats">Статистика</Link>
        </Menu.Item>
      </Menu>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
