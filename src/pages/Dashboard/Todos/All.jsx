import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Button, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../contexts/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddTodoModal from "./AddTodoModal";

const All = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  // Fetch Todos with Real-Time Updates
  useEffect(() => {
    if (user.uid) {
      const q = query(collection(firestore, "todos"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const array = [];
        snapshot.forEach((doc) => {
          const document = { ...doc.data(), id: doc.id };
          array.push(document);
        });
        setTodos(array);
      });
      return () => unsubscribe();
    }
  }, [user.uid]);

  // Calculate Time Remaining with Countdown Effect
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};
      todos.forEach((todo) => {
        const now = new Date();
        const due = new Date(todo.dueDate);
        const diff = due - now;
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          // const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          // updatedCountdowns[todo.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          updatedCountdowns[todo.id] =
          days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : `${minutes}m`;

        } else {
          updatedCountdowns[todo.id] = "Overdue";
          
          // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          // updatedCountdowns[todo.id] =
          // days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : `${minutes}m`;

          // const overdue = Math.abs(diff);
          // updatedCountdowns[todo.id] = `-${Math.floor(overdue / (1000 * 60 * 60 * 24))}d`;
        }
      });
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [todos]);

  // Update Todo Status
  const handleUpdateStatus = async (todo) => {
    const updatedData = { status: "completed", updateAt: serverTimestamp() };
    setLoading(true);
    try {
      await setDoc(doc(firestore, "todos", todo.id), updatedData, { merge: true });
      window.notify("Todo status updated to completed successfully", "success");
    } catch (e) {
      window.notify("Error while updating todo status", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resume
  const handleResume = async (todo) => {
    Modal.confirm({
      title: "Resume Todo",
      content: (
        <Form
          onFinish={async (values) => {
            const updatedData = {
              status: "incompleted",
              dueDate: values.dueDate,
              updateAt: serverTimestamp(),
            };
            setLoading(true);
            try {
              await setDoc(doc(firestore, "todos", todo.id), updatedData, { merge: true });
              window.notify("Todo resumed with new due date", "success");
            } catch (e) {
              window.notify("Error while resuming todo", "error");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form.Item
            name="dueDate"
            label="New Due Date"
            rules={[{ required: true, message: "Please select a new due date" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Confirm
          </Button>
        </Form>
      ),
      okButtonProps: { style: { display: "none" } },
      cancelText: "Cancel",
    });
  };

//------------------------------- FUNCTION WHEN CLICK ON DELETE ICON  --------------------

  // Delete Todo
  const handleDelete = async (todo) => {
    Modal.confirm({
      title: "Are you sure you want to delete this todo?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        setLoading(true);
        try {
          await deleteDoc(doc(firestore, "todos", todo.id));
          window.notify("Todo deleted successfully", "success");
        } catch (error) {
          window.notify("Error while deleting todo", "error");
        } finally {
          setLoading(false);
        }
      },
    });
  };


//------------------------------------ EDIT MODAL -----------------------
  // Show Edit Modal
  const showEditModal = (todo) => {
    setEditingTodo(todo);
    setIsEditModalVisible(true);
  };

//---------------------------------------- FUNCTION WHEN CLICK AFTER EDIT THE TODO --------------------

  const handleEditSubmit = async (values) => {
    const updatedData = {
      ...values,
      updateAt: serverTimestamp(),
    };
    setLoading(true);
    try {
      await setDoc(doc(firestore, "todos", editingTodo.id), updatedData, { merge: true });
      window.notify("Todo updated successfully", "success");
      setIsEditModalVisible(false);
      setEditingTodo(null);
    } catch (error) {
      window.notify("Error while updating todo", "error");
    } finally {
      setLoading(false);
    }
  };

//-------------------------------------- THREE DOT ICONS FOR EDIT, RESUME & DELETE -----------------------------

  // Render Menu
  const renderMenu = (todo) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => showEditModal(todo)}>
        <i className="fas fa-pen"></i> Edit
      </Menu.Item>
      {/* <Menu.Item key="resume" onClick={() => handleResume(todo)}>
        <i className="fas fa-redo"></i> Resume
      </Menu.Item> */}
      <Menu.Item key="delete" onClick={() => handleDelete(todo)}>
        <i className="fas fa-trash"></i> Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <main className="p-5">
      <div className="container-fluid px-5 py-4">
        <div className="d-flex justify-content-between  mt-2">
        <h2 className="text-primary ">All Todos</h2>
        <AddTodoModal 
          // 
        />
        </div>
        
       

       
        <div className="card shadow-sm">
          <div className="card-body p-4 table-responsive">
            <table className="table table-hover table-borderless align-middle custom-table">
              <thead className="table-light">
                <tr className="text-center">
                  <th>#</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Due Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, i) => {
                  const timeRemaining = countdowns[todo.id] || "Calculating...";
                  const isOverdue = timeRemaining === "Overdue";
                  


                  return (
                    <tr
                      key={todo.id}
                      className={`text-center custom-row ${isOverdue ? "bg-danger text-white" : ""}`}
                    >
                      <td>{i + 1}</td>
                      <td>{todo.title}</td>
                      <td>{todo.location}</td>
                      <td>{timeRemaining}</td>
                      <td>{todo.description}</td>
                      <td >
                       
                        <span
                          className={`badge ${
                            todo.status === "completed"
                              ? "bg-success"
                              : isOverdue
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          } ` } 
                        >
                          {todo.status}
                        </span>  
                     
                        
                      </td>

{/* //---------------------------------------------------- ICONS FOR UPDATE & THREE DOT ICONS ---------------------- */}
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            title="Update Status"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleUpdateStatus(todo)}
                            disabled={loading || isOverdue || todo.status === "completed"}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <Dropdown overlay={renderMenu(todo)} trigger={["click"]}>
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                          </Dropdown>
                        </div>
                      </td>

{/* -------------------------------------------------------------------------------------------------- */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

     

      </div>


{/* -----------------------------------------------MODALS FOR EDIT, RESUME AND DELETE ------------------------ */}
      <Modal
        title="Edit Todo"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {editingTodo && (
          <Form
            initialValues={{
              title: editingTodo.title,
              location: editingTodo.location,
              description: editingTodo.description,
            }}
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter a location" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <div className="text-center">
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Todo
              </Button>
            </div>
          </Form>
        )}
      </Modal>

{/* ------------------------------------------------------------------------------------------------- */}
    </main>
  );
};

export default All;



