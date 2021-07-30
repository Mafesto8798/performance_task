import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  EuiInMemoryTable,
  EuiButtonIcon,
  EuiText,
  EuiSelect,
  EuiModalBody,
  EuiButton,
  EuiModal,
  EuiPageBody,
  EuiPage,
} from "@elastic/eui";

interface UserType {
  id: Number;
  first_name: String;
  last_name: String;
  email: String;
  verified: Boolean;
  middle_initial?: String;
  created_at: String;
  district: Number;
  active: Boolean;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<Boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType>(users[0]);
  const handleEditUser = (userToEdit: UserType) => {
    setSelectedUser(userToEdit);
    setIsEditing(true);
  };

  const handleDeleteUser = (userToDelete: UserType) => {
    setSelectedUser(userToDelete);
    setConfirmDelete(true);
  };

  const deleteUser = (userToDelete: UserType) => {
    const updatedUserList = users.filter(
      (user: UserType) => user !== userToDelete
    );
    setUsers(updatedUserList);
    setConfirmDelete(false);
  };

  const updateUser = (user: UserType, field: string, newValue: string) => {
    const userIndex = users.map((user: UserType) => user.id).indexOf(user.id);

    const updatedUserList = [...users];

    updatedUserList[userIndex] = {
      ...updatedUserList[userIndex],
      [field]: newValue,
    };

    setUsers(updatedUserList);
  };

  const saveEdits = () => {
    setIsEditing(false);
  };

  //Fetching the JSON data
  useEffect(() => {
    try {
      axios.get("/users.json").then((res) => {
        setUsers(res.data);
        console.log(users);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  //Columns for Elastic UI
  const columns = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "last_name",
      name: "Last Name",
    },
    {
      field: "first_name",
      name: "First Name",
    },
    {
      field: "middle_initial",
      name: "M.I.",
    },
    {
      field: "district",
      name: "District",
    },
    {
      name: "Verified",
      field: "verified",
    },
    {
      name: "Active",
      field: "active",
    },
    {
      name: "Email",
      field: "email",
    },
    {
      name: "Edit",
      render: (user: UserType) => {
        return (
          <EuiButtonIcon
            iconType="pencil"
            size="m"
            color="text"
            display="fill"
            onClick={() => handleEditUser(user)}
          />
        );
      },
    },
    {
      name: "Delete",
      render: (user: UserType) => {
        return (
          <EuiButtonIcon
            iconType="trash"
            size="m"
            color="danger"
            display="fill"
            onClick={() => handleDeleteUser(user)}
          />
        );
      },
    },
  ];

  //Modal for editing user
  if (isEditing) {
    return (
      <EuiModal className="modal" onClose={saveEdits}>
        <EuiModalBody>
          <EuiText>Select a new district.</EuiText>
          <EuiSelect
            onChange={(e: any) =>
              updateUser(selectedUser, "district", e.target.value)
            }
            options={[
              { value: 1, text: "1" },
              { value: 2, text: "2" },
              { value: 3, text: "3" },
              { value: 4, text: "4" },
            ]}
          />
          <EuiButton fill color="success" onClick={() => saveEdits()}>
            Save
          </EuiButton>
        </EuiModalBody>
      </EuiModal>
    );
  }

  //Modal for deleting user
  if (confirmDelete) {
    return (
      <EuiModal className="modal" onClose={() => {}}>
        <EuiModalBody className="modal-body">
          <EuiText>Are you sure you want to delete this user?</EuiText>
          <EuiButton
            fill
            color="success"
            onClick={() => setConfirmDelete(false)}
          >
            No
          </EuiButton>
          <EuiButton
            fill
            color="danger"
            onClick={() => deleteUser(selectedUser)}
          >
            Delete
          </EuiButton>
        </EuiModalBody>
      </EuiModal>
    );
  }

  return (
    <>
      <EuiPage paddingSize="l">
        <EuiPageBody restrictWidth="2200px" style={{ marginTop: "7rem" }}>
          <EuiInMemoryTable
            items={[...users]}
            columns={columns}
            pagination={true}
          />
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default UserTable;
