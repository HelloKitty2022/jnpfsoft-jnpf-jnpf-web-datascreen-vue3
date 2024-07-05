<template>
  <el-dialog title="快捷键" class="avue-dialog" append-to-body v-model="show" width="50%">
    <div class="avue-crud" style="padding:unset">
      <el-table :data="data" size="small">
        <el-table-column prop="name" label="功能">
        </el-table-column>
        <el-table-column prop="value" width="200" label="快捷键">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      data: [{
        name: '向上移动',
        value: '↑'
      }, {
        name: '向右移动',
        value: '→'
      }, {
        name: '向下移动',
        value: '↓'
      }, {
        name: '向左移动',
        value: '←'
      }, {
        name: '长按向一个方向移动',
        value: 'SHIST'
      }, {
        name: '删除组件',
        value: 'DELETE'
      }, {
        name: '复制',
        value: 'CTRL + C'
      }, {
        name: '粘贴',
        value: 'CTRL + V'
      }, {
        name: '回退',
        value: 'CTRL + Z'
      }, {
        name: '前进',
        value: 'CTRL + Y'
      }, {
        name: '锁定/解锁',
        value: 'CTRL + L'
      }, {
        name: '批量选组件',
        value: 'CTRL + 鼠标勾选'
      }, {
        name: '保存大屏',
        value: 'CTRL + S'
      }, {
        name: '放大/缩小布局',
        value: 'CTRL + 鼠标滑轮'
      }, {
        name: '单击文件夹图标可以全选',
        value: '-'
      }, {
        name: '双击名称可以直接修改文字',
        value: '-'
      }]
    }
  }
}
</script>