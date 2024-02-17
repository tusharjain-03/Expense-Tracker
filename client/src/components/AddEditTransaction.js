import React from 'react'
import {Modal, Form, Input, Select, message} from 'antd';
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTransaction({showAddEditTransactionModal, setShowAddEditTransactionModal, getTransactions, selectedItemForEdit, setSelectedItemForEdit}) {
  
  const [loading, setLoading] = React.useState(false);

  const user = JSON.parse(localStorage.getItem('Expense Tracker- User'));

  const onFinish = async (values) => {
    try {
        setLoading(true);
        if(selectedItemForEdit){
          await axios.post("/api/transactions/edit-transaction", { payload : {...values, userId : user._id}, transactionId : selectedItemForEdit._id});
          getTransactions();
          message.success("Transaction Updated Successfully");
        }else{
          await axios.post("/api/transactions/add-transaction", {...values, userId : user._id});
          getTransactions();
          message.success("Transaction Added Successfully");
        }
        setShowAddEditTransactionModal(false);
        setLoading(false);
    } catch (error) {
        message.error("Something went wrong");
        setLoading(false);
    }
  }

  return (
    <div>
      <Modal 
          title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
          open={showAddEditTransactionModal}
          onCancel={() => setShowAddEditTransactionModal(false)}
          footer={false}
          centered
        >
          {loading && <Spinner/>}
          <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
            <Form.Item label="Amount" name="amount">
              <Input type="number" min="1"/>
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="freelance">Freelance</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="entertainment">Entertainment</Select.Option>
                <Select.Option value="travel">Travel</Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date">
              <Input type="date"/>
            </Form.Item>

            <Form.Item label="Reference" name="reference">
              <Input type="reference"/>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input type="text"/>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <button className="primary" type="submit">Save</button>
            </div>
          </Form>
        </Modal>
    </div>
  )
}

export default AddEditTransaction;
