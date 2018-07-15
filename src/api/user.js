import {get, post} from '@/util/fetch'

export function getUsers() {
  return get('user/findAll')
}

export function save(data) {
  return post('user/save', data)
}

export function update(data) {
  return post('user/edit', data)
}

export function Delete(data) {
  return post('user/delete', data)
}