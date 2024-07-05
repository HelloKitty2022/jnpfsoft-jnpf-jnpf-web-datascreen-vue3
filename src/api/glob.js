import { url } from '@/config';
import request from '../axios'
export const getList = (params) => request({
  url: url + '/visual-global/list',
  method: 'get',
  params: params
});



export const getObj = (id) => request({
  url: url + '/visual-global/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: url + '/visual-global/save',
  method: 'post',
  data: data
});
export const updateObj = (data) => request({
  url: url + '/visual-global/update',
  method: 'post',
  data: data
});



export const delObj = (id) => request({
  url: url + '/visual-global/remove',
  method: 'post',
  params: {
    ids: id
  }
});