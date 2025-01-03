import { useNavigate } from "react-router-dom";
import { SubmitButton } from "./Fields";
import { useContext } from "react";
import { Context, ContextType } from "../context";

export type TTableList = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export type Props = {
  tableList: TTableList[];
  deleteData: (id: string) => void;
  pageLinks: any[];
}

export function TableList({ tableList, deleteData, pageLinks }: Props) {
  const navigate = useNavigate();

  const { page, setPage } = useContext(Context) as ContextType;

  const handlePagination = (page: any) => () => {
    setPage(parseInt(page));
  }

  const navigateCreate = () => {
    navigate('/create');
  }

  const navigateView = (id: string) => () => {
    navigate('/view/' + id);
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className='text-2xl font-bold'>Customers</p>
        <SubmitButton label="Create" onClick={navigateCreate} />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                First name
              </th>
              <th scope="col" className="px-6 py-3">
                Last name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((data, index) => (
              <tr key={index} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {data.firstName}
                </th>
                <td className="px-6 py-4">
                  {data.lastName}
                </td>
                <td className="px-6 py-4">
                  {data.email}
                </td>
                <td className="px-6 py-4">
                  {data.contactNumber}
                </td>
                <td className="px-6 py-4 flex">
                  <button onClick={navigateView(data.id!)} type="button" className="text-blue-700 border border-blue-700 hover:border-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    View
                  </button>
                  <button type="button" onClick={() => deleteData(data.id!)} className="text-red-500 border border-red-500 hover:border-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          {pageLinks[0]?.url !== null && (
            <button onClick={handlePagination(page - 1)} type="button" className="text-gray-700 border border-gray-700 hover:border-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              {'<'}
            </button> 
          )}
          {pageLinks.slice(1, -1).map((item, index) => (
            <button key={item.label + index} onClick={handlePagination(item?.label)} type="button" className={`text-gray-700 border border-gray-700 ${item.active && 'bg-blue-700 text-white'} hover:border-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
              {item.label}
            </button>
          ))}
          {pageLinks[pageLinks.length - 1]?.url !== null && (
            <button onClick={handlePagination(page + 1)} type="button" className="text-gray-700 border border-gray-700 hover:border-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              {'>'}
            </button> 
          )}
        </div>
      </div>
    </div>
  );
}