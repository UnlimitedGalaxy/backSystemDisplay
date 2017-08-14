<script type="text/ecmascript-6">
  /*
  * {
  *   class: {classname: true},
  *   style: {name: value},
  *   size: num, //不设置，默认为1,即垂直排布
  *   children: [
  *    {
  *     label: '',
  *     valueName: '', // 必须与别的children不一样
  *     type: 'select | input | ...',
  *     props: {},
  *     on: {
  *       change: function
  *     },
  *     install: function,
  *     ['class']: { classname: true },
  *     style: { width: '100%' },
  *    }
  *   ]
  * }
  * */
  
  const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const getValue = (obj, props) => {
    const temp = {};
    props.replace(/\s/, '').split(',').forEach((item) => {
      if (hasProperty(obj, item)) {
        temp[item] = obj[item];
      }
    });
    return temp;
  };
  /**
   *  [按给定大小分割数组]
   * @param {Array|String} arr [分割对象]
   * @param {Number} size [分割大小]
   * @return {Array}  finalArr [返回分割后的数组]
   */
  const splitArr = (arr, size) => {
    let finalSize = Math.abs(Math.floor(size * 1) || 1);
    let length = arr.length;
    if (!length) {
      return [];
    }
    let finalArr = [];
    for (let i = 0; i < length;) {
      finalArr.push(arr.slice(i, i += finalSize));
    }
    return finalArr;
  }
  export default {
    render(h) {
      function returnRow(children) {
        const childs = children.map((item, index) => h('el-col',
          {
            style: {
              textAlign: this.pickLocation(index),
              width: `${Math.floor((1 / this.settings.size) * 10000) / 100}%`,
            },
          },
          [
            h('div', { ['class']: { labelStyle: true } }, item.label),
            h(`el-${item.type}`, {
              style: {
                ...item.style,
              },
              class: {
                commonWidth: true,
                ...item.class,
              },
              props: {
                value: this.filterParams[item.valueName],
                ...item.props,
              },
              on: {
                input: (value) => {
                  this.filterParams[item.valueName] = value;
                },
                ...item.on,
              }
            }, item.type === 'select' &&
              this.options[`${item.valueName}Options`].map((item, index) => h('el-option', {
                props: {
                  value: item.value,
                  label: item.label,
                  key: index,
                }
              }))
            ),
          ]));
        return h('el-row', getValue(this.settings, 'class,style'), childs);
      }
      
      const self = this;
      return h('div',
        this.finalChilds.map((item) => {
          return returnRow.call(self, item);
        })
      );
    },
    data() {
      const obj = {
        finalChilds: [],
        filterParams: {},
        options: {},
      };
      this.settings.children.forEach((item) => {
        switch (item.type) {
          case 'cascader':
            obj.filterParams[item.valueName] = [];
            obj.options[`${item.valueName}Options`] = [];
            break;
          case 'select':
            obj.filterParams[item.valueName] = '';
            obj.options[`${item.valueName}Options`] = [];
            break;
          default:
            obj.filterParams[item.valueName] = '';
            break;
        }
      });
      return obj;
    },
    methods: {
      pickLocation(index) {
        switch (index) {
          case 0:
            return 'left';
          case this.settings.children.length - 1:
            return 'right';
          default:
            return 'center';
        }
      },
    },
    watch: {
      filterParams: {
        deep: true,
        handler(val) {
          this.$emit('input', this.filterParams);
        },
      },
    },
    props: {
      settings: {
        type: Object,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      },
    },
    created() {
      this.settings.size = this.settings.size || 1;
      this.settings.children.forEach((item) => {
        item.install && item.install.call(this, item);
      });
      this.finalChilds = splitArr(this.settings.children, this.settings.size);
    },
  };
</script>

<style rel="stylesheet/css">
  .commonWidth {
    width: 60% !important;
  }
  .labelStyle {
    display: inline-block;
    width: 20%;
    white-space: pre-line;
    vertical-align: top;
  }
</style>
