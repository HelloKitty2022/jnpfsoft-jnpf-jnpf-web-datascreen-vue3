/* eslint-disable */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import { h } from 'vue'
function beautifier(value) {
  return JSON.stringify(value, null, 4)
}
function noop() { }

export { monaco };

export default {
  name: 'MonacoEditor',
  props: {
    diffEditor: { type: Boolean, default: false },      //是否使用diff模式
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '400px' },
    original: String,       //只有在diff模式下有效
    modelValue: [String, Object, Array],
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'vs-dark' },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default() { return {}; } },
    editorMounted: { type: Function, default: noop },
    editorBeforeMount: { type: Function, default: noop },
  },

  watch: {
    options: {
      deep: true,
      handler(options) {
        this.editor && this.editor.updateOptions(options);
      }
    },
    language() {
      if (!this.editor) return;
      if (this.diffEditor) {      //diff模式下更新language
        const { original, modified } = this.editor.getModel();
        monaco.editor.setModelLanguage(original, this.language);
        monaco.editor.setModelLanguage(modified, this.language);
      } else
        monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
    },
    theme() {
      this.editor && monaco.editor.setTheme(this.theme);
    },
    style() {
      this.editor && this.$nextTick(() => {
        this.editor.layout();
      });
    },
    modelValue(val) {
      if (this.editor && val !== this._getValue()) {
        this._setValue(val)
      }
    }
  },
  computed: {
    style() {
      return {
        width: !/^\d+$/.test(this.width) ? this.width : `${this.width}px`,
        height: !/^\d+$/.test(this.height) ? this.height : `${this.height}px`,
        position: 'relative'
      }
    }
  },
  mounted() {
    this.initMonaco();
  },
  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
  render() {
    const fullScreen = this.options.fullScreen
    return h('div', { class: 'monaco_editor_container', style: this.style }, [
      fullScreen ? h('i', { class: 'el-icon-full-screen', style: { width: '1.2em', height: '1.2em', position: 'absolute', left: '0px', top: '0px', zIndex: '1', cursor: 'pointer' }, on: { click: this._handleFullScreen } }) : ''
    ])
  },
  methods: {
    initMonaco() {
      const { modelValue, language, theme, disabled, options } = this;
      const value = modelValue;
      Object.assign(options, this._editorBeforeMount());      //编辑器初始化前
      this.editor = monaco.editor[this.diffEditor ? 'createDiffEditor' : 'create'](this.$el, {
        value: typeof value == 'string' ? value : beautifier(value),
        language: language,
        theme: theme,
        readOnly: disabled,
        minimap: {
          enabled: false,
        },
        fontSize: 13,
        fullScreen: true,
        automaticLayout: true, // 自动布局
        foldingStrategy: 'indentation', // 代码可分小段折叠
        autoClosingBrackets: 'always',
        folding: true,
        ...options
      });
      this.diffEditor && this._setModel(this.modelValue, this.original);
      this._editorMounted(this.editor);      //编辑器初始化后
    },

    _handleFullScreen() {
      if (this.isMaximum) this.minEditor()
      else this.maxEditor()
    },
    // 放大
    maxEditor() {
      this.isMaximum = true
      let dom = this.$el
      this.originSize = {
        width: dom.clientWidth,
        height: dom.clientHeight
      }
      dom.classList.add('editor-fullscreen')
      this.editor.layout({
        height: document.body.clientHeight,
        width: document.body.clientWidth
      })

      document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) {
          this.minEditor()
        }
      })
    },
    // 缩小
    minEditor() {
      this.isMaximum = false
      let dom = this.$el
      dom.classList.remove('editor-fullscreen')
      this.editor.layout({
        height: this.originSize.height,
        width: this.originSize.width
      })
      document.removeEventListener('keyup', () => { })
    },

    _getEditor() {
      if (!this.editor) return null;
      return this.diffEditor ? this.editor.modifiedEditor : this.editor;
    },

    _setModel(value, original) {     //diff模式下设置model
      const { language } = this;
      const originalModel = monaco.editor.createModel(original, language);
      const modifiedModel = monaco.editor.createModel(value, language);
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      });
    },

    _setValue(value) {
      let editor = this._getEditor();
      if (typeof value == 'object') {
        value = beautifier(value)
      }
      if (editor) return editor.setValue(value || '');
    },

    _getValue() {
      let editor = this._getEditor();
      if (!editor) return '';
      return editor.getValue();
    },

    _editorBeforeMount() {
      const options = this.editorBeforeMount(monaco);
      return options || {};
    },

    _editorMounted(editor) {
      this.editorMounted(editor, monaco);
      if (this.diffEditor) {
        editor.onDidUpdateDiff((event) => {
          const value = this._getValue();
          this._emitChange(value, event);
        });
      } else {
        editor.onDidChangeModelContent(event => {
          const value = this._getValue();
          this._emitChange(value, event);
        });
      }
    },

    _emitChange(value, event) {
      this.$emit('change', value, event);
      this.$emit('update:modelValue', value);
    }
  }
}