import React, { useState, useEffect, useContext } from 'react'
import { TableList, type TTableList } from '../components'
import { deleteCustomer, getCustomers } from '../services/RestApi';
import { Context, ContextType } from '../context';

export function ListPage() {

  const { page } = useContext(Context) as ContextType;
  const [tableList, setTableList] = useState<TTableList[]>([]);
  const [pageLinks, setPageLinks] = useState<any[]>([]);

  console.log('page', page);

  const fetchCustomer = async () => {
    const { data } = await getCustomers({ page });
    setTableList(data.data);
    const links = data.links;
    setPageLinks(links);
  }

  const deleteData = async (id: string) => {
    await deleteCustomer(id);
    await fetchCustomer();
  }

  useEffect(() => {
    fetchCustomer();
  },[page]);

  return (
    <TableList
      tableList={tableList}
      deleteData={deleteData}
      pageLinks={pageLinks}
    />
  )
}
