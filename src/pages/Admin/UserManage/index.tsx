import {useRef} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {getSearch} from "@/services/ant-design-pro/api";
import {Image} from "antd";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_,record)=>{
      <Image src={record.avatarUrl} width={80}/>
    },
    search: false,
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    search: false,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    search: false,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: false,
  },
  {
    title: '账户状态',
    dataIndex: 'userStatus',
    search: false,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '禁用',
        status: 'Error'
      },
      0: {
        text: '启用',
        status: 'Success'
      }
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        if(params.username!=null){
          const user =await getSearch(params.username);
          return {data:user}
        }else{
          const user =await getSearch();
          return {data:user}
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};



