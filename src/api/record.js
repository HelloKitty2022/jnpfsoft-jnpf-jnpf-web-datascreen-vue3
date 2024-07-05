import { url } from '@/config';
import request from '../axios'
export const getList = (params) => request({
  url: url + '/record/list',
  method: 'get',
  params: params
});



export const getObj = (id) => request({
  url: url + '/record/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: url + '/record/save',
  method: 'post',
  data: data
});
export const updateObj = (data) => request({
  url: url + '/record/update',
  method: 'post',
  data: data
});



export const delObj = (id) => request({
  url: url + '/record/remove',
  method: 'post',
  params: {
    ids: id
  }
});