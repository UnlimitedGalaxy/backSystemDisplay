<template>
  <div class="hello">
    <UFilterFrom
      style="width: 80%;"
      :settings="settings"
      v-model="filterParams">
    </UFilterFrom>
  </div>
</template>

<script>
  import UFilterFrom from './UFilterFrom';
  
  export default {
    name: 'hello',
    components: {
      UFilterFrom,
    },
    data() {
      return {
        settings: {
        ['class']: { classname: true },
        style: { marginBottom: '16px' },
        size: 3,
          children: [
          {
            label: '测试测试测试 ',
            valueName: 'test',
            type: 'cascader',
            props: {
              clearable: true,
            },
            on: {
              change(val) {
                console.log('onChange', val);
              },
            },
            install(item) {
              if (this.options.testOptions) {
                this.options.testOptions = [{ label: 'apple', value: 1 }];
                item.props.options = this.options.testOptions;
              }
            },
          },
          {
            label: '测试2测试2测试2 ',
            valueName: 'test2',
            type: 'select',
            props: {
              clearable: true,
            },
            on: {
              change(val) {
                console.log('Test2onChange', val);
              },
            },
            install(item) {
              if (this.options.test2Options) {
                this.options.test2Options = [{ label: 'orange', value: 2 }];
              }
            },
          },
          {
            label: '测试3测试3测试3 ',
            valueName: 'test3',
            type: 'input',
            on: {
              change(val) {
                console.log('Test3onChange', val);
              },
            },
          },
          {
            label: '测试3测试3测试3 ',
            valueName: 'test5',
            type: 'input',
            on: {
              change(val) {
                console.log('Test3onChange', val);
              },
            },
          },
          {
            label: '测试4测试4测试4测试4 ',
            valueName: 'test4',
            type: 'date-picker',
            props: {
              type: 'daterange',
              placeholder: '选择日期范围',
              ['picker-options']: {
                shortcuts: [
                  {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
                      picker.$emit('pick', [start, end]);
                    },
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
                      picker.$emit('pick', [start, end]);
                    },
                  }, {
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
                      picker.$emit('pick', [start, end]);
                    },
                  }, {
                    text: '最近两天',
                    onClick(picker) {
                      const end = new Date();
                      end.setHours(23, 59, 59, 0);
                      const start = new Date((end.getTime() - (3600 * 1000 * 48)) + 1000);
                      picker.$emit('pick', [start, end]);
                    },
                  }],
              }
            },
            on: {
              change(val) {
                console.log('Test4onChange', val);
              },
            },
          },
        ]
      },
        filterParams: {},
      }
    }
  }
</script>

<style>
</style>
