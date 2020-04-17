import Axios, { AxiosPromise } from 'axios'

export interface IService {
  getUsers(): AxiosPromise<IUser>
}

export interface IUser {
  id: string
  name: string
  age: number
  type: UserType
}

export enum UserType {
  User = 0,
  TenantAdmin,
  Admin,
}

const service: IService = {
  getUsers: () => {
    return Axios.get(`/user`)
  },
}

export { service }
