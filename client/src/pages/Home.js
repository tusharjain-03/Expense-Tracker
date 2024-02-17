import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import AddEditTransaction from '../components/AddEditTransaction';
import '../resources/transactions.css';
import axios from 'axios';
import { DatePicker, Select, Table, message } from 'antd';
import Spinner from '../components/Spinner';
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import moment from "moment";
import Analytics from '../components/Analytics';
const {RangePicker} = DatePicker;

function Home() {

  const user = JSON.parse(localStorage.getItem('Expense Tracker- User'));

  const [loading, setLoading] = React.useState(false);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = React.useState(false);
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [frequency, setFrequency] = React.useState("7");
  const [selectedRange, setSelectedRange] = React.useState([]);
  const [type, setType] = React.useState("all");
  const [viewType, setViewType] = React.useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);

  const getTransactions = async () => {
     try {
       setLoading(true);
       const response = await axios.post("/api/transactions/get-all-transactions", {userId : user._id, frequency, ...(frequency === "custom" && {selectedRange}), type}); 
       setTransactionsData(response.data);
       setLoading(false);
     } catch (error) {
       setLoading(false);
       message.error("Something went wrong");
     }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction",{transactionId : record._id} ); 
      message.success("Transaction Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
 };

  const columns = [
    {
      title:"Date",
      dataIndex:"date",
      render:(text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title:"Amount",
      dataIndex:"amount",
    },
    {
      title:"Category",
      dataIndex:"category",
    },
    {
      title:"Type",
      dataIndex:"type",
    },
    {
      title:"Reference",
      dataIndex:"reference",
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text, record) => {
        return (
          <div className="d-flex">
             <EditOutlined onClick={() => { 
               setSelectedItemForEdit(record);
               setShowAddEditTransactionModal(true)}
              }
             />
             <DeleteOutlined className="mx-3" onClick={() => deleteTransaction(record)}/>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    getTransactions();
  },[frequency, selectedRange, type]);

  return (
    <DefaultLayout>
       {loading && <Spinner/>}

       {/* filters */}
       <div className="filter d-flex justify-content-between align-items-center">
          <div className="d-flex">
             <div className="d-flex flex-column">
                <h6>Select Frequency</h6>
                <Select value={frequency} onChange={(value) => setFrequency(value)}>
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                  <Select.Option value="custom">Custom</Select.Option>
                </Select>

                {frequency === "custom" && (
                  <div className="mt-2">
                    <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)}/>
                  </div>
                )}
             </div>

             <div className="d-flex flex-column mx-5">
                <h6>Select Type</h6>
                <Select value={type} onChange={(value) => setType(value)}>
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
             </div>
          </div>

          <div className="d-flex">
            <div>
              <div className="view-switch d-flex mx-5">
                 <UnorderedListOutlined className={`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"}`}
                    onClick={() => setViewType('table')}
                 />
                 <AreaChartOutlined className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"}`}
                    onClick={() => setViewType("analytics")}
                 />
              </div>
            </div>
            <button className="primary" onClick={() => { setSelectedItemForEdit(null) 
              setShowAddEditTransactionModal(true) }}>ADD NEW</button>
          </div>
       </div>

       {/* analtics */}
       <div className="table-analtics">
          {viewType === "table" ? 
             <div className="table">
               <Table columns={columns} dataSource={transactionsData}></Table>
             </div> : <Analytics transactions={transactionsData} />
          }
       </div>

       {showAddEditTransactionModal && <AddEditTransaction showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal={setShowAddEditTransactionModal} getTransactions={getTransactions} selectedItemForEdit={selectedItemForEdit} setSelectedItemForEdit={setSelectedItemForEdit}/>}

    </DefaultLayout>
  )
}

export default Home;
