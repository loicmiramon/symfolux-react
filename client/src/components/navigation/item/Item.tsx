import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/UserContext';

interface ItemProps {
  navType: string
  isActiveNavLink: string
  name: string
  path: string
}

const Item: React.FC<ItemProps> = (props) => {

  const {isActiveNavLink, name, path, navType} = props

  const {logout} = useContext(AuthContext)

  return (
    navType === 'navigation' ?
    <Link className={isActiveNavLink === path ? "link-navigation active-link" : "link-navigation"} to={path} title={name}>{name}</Link> :
    <li className="item-subnavigation">
      <Link className={isActiveNavLink === path ? "link-navigation active-link" : "link-navigation"} to={path} title={name}>{ name }</Link> 
    </li> || navType === 'logout'? <li className="item-subnavigation" onClick={logout}>
      <Link className={isActiveNavLink === path ? "link-navigation active-link" : "link-navigation"} to={path} title={name}>{ name }</Link> 
    </li> : <li className="item-subnavigation">
      <Link className={isActiveNavLink === path ? "link-navigation active-link" : "link-navigation"} to={path} title={name}>{ name }</Link> 
    </li>

    )
}

export default Item