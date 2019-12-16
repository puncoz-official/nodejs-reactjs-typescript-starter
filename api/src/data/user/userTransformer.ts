import { User } from "./User"

export default (user: User) => ({
    id: user._id,
    email: user.email,
    username: user.username,
    display_name: user.profile.name || user.username || user.email,
})
