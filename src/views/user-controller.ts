export interface IUserController {
  userLogined(username: string): string

  getCurrentUsername(): string

  logout(): void
}

let localUser = ''
const localUserKey = `local-user-key`

// 这里做了一个简单的状态管理装置，实际系统中应该把
// 登陆user（非敏感信息） 存储在持久化介质如 localStorage/cookie 中，因为用户不可避免的会有刷新页面操作
// 本地持久化的用户信息 （UID，时间戳，用户状态等）也是判定当前登陆是否有效的标志，一般的系统会有定时（主动或被动）或者强制性的登陆状态检查

const userController: IUserController = {
  userLogined: (u) => {
    localUser = u

    if (u) {
      const userInfo = {
        key: new Date().valueOf(),
        value: u,
      }
      localStorage.setItem(localUserKey, JSON.stringify(userInfo))
    }

    return localUser
  },
  getCurrentUsername: () => {
    if (localUser) {
      return localUser
    }

    const cache = localStorage.getItem(localUserKey)

    if (cache) {
      const u = JSON.parse(cache)
      const timestamp = u.key
      /// 测试数据，60s 内登陆过期
      if (new Date().valueOf() - timestamp > 60000) {
        return null
      }
      return u.value
    }

    return null
  },
  logout: () => {
    localStorage.removeItem(localUserKey)
  },
}

export { userController }
