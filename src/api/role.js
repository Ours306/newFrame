import {get, post} from '@/util/fetch'

export function getRoles() {
  return get('role/findAll')
}

export function save(data) {
  return post('role/save', data)
}

export function update(data) {
  return post('role/edit', data)
}

export function Delete(data) {
  return post('role/delete', data)
}