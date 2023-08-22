import React, { useEffect, useState } from "react";
import "./UserItem.css";
import "./AdminPanel.css";
import {
  getAllUser,
  updateUser,
  deleteUser,
  addUser,
} from "../services/userServices";
function UserItem() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [refresh, setRefresh] = useState(true);
  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user._id === userId);
    setUpdatedUsername(userToEdit.userName);
    setUpdatedPassword("");
  };
  useEffect(() => {
    if (refresh) {
      getAllUser()
        .then((res) => {
          setEditingUserId(null);
          setUsers(res.data.data);
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh]);
  const handleAddUser = () => {
    const AddUser = {
      userName: newUsername,
      password: newPassword,
    };
    addUser(AddUser)
      .then((res) => {
        setRefresh(true);
        setShowAddForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (userId) => {
    const UpdateUserData = {
      _id: userId,
      userName: updatedUsername,
      password: updatedPassword,
    };
    updateUser(UpdateUserData)
      .then((res) => {
        setNewUsername("");
        setNewPassword("");
        setEditingUserId(null);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (userId) => {
    deleteUser(userId)
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleToggleForm = () => {
    setNewPassword("");
    setNewUsername("");
    setShowAddForm((prevValue) => !prevValue); // Toggle the value
  };
  return (
    <div className="container">
      <h2 className="blogs-header">
        {showAddForm ? "Add User" : "Users"}
        {!showAddForm && (
          <button className="add-new-button" onClick={handleToggleForm}>
            Add New User
          </button>
        )}
      </h2>
      <div className="parent-container">
        <div className="left-section"></div>
        <div className="center-section">
          {showAddForm ? (
            <div className="user-item">
              <div className="user-info">
                <div className="edit-form">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Username"
                      value={newUsername}
                      onChange={(e) => {
                        setNewUsername(e.target.value);
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button className="save-button" onClick={handleToggleForm}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          ) : (
            <div className="user-list">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className="user-item">
                    <div className="user-info">
                      {editingUserId === user._id ? (
                        <div className="edit-form">
                          <div className="input-container">
                            <input
                              value={updatedUsername}
                              onChange={(e) => {
                                setUpdatedUsername(e.target.value);
                              }}
                            />
                            <input
                              type="password"
                              value={updatedPassword}
                              onChange={(e) =>
                                setUpdatedPassword(e.target.value)
                              }
                            />
                          </div>

                          <div className="button-container">
                            <button
                              className="save-button"
                              onClick={() => setEditingUserId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="save-button"
                              onClick={() => handleUpdate(user._id)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="user-row">
                          <span className="username">{user.userName}</span>
                          <span className="buttons">
                            <button
                              className="edit-button"
                              onClick={() => handleEdit(user._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </button>
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-users">
                  <p>No Users Available</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default UserItem;
