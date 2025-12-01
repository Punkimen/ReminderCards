import type { FC } from "react"
import type { WebAppUser } from "telegram-web-app"
import s from './User.module.scss';

interface IProps {
  user: WebAppUser
}

export const User:FC<IProps> = ({user}) => {

return <div className={s.user}>
  <div className={s.avatar}>
    <image src={user?.photo_url } />
  </div>
  <div className={s.name}>
    {user?.username || 'Max'}
  </div>
</div>
}
