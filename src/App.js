import React, { useState } from 'react';
import './style.css';
import DataTable from 'react-data-table-component';
import { Edit3, Trash2 } from 'react-feather';

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const initialData = [
  {
    id: 1,
    name: 'John Doe',
    location: 'New York',
    cgpa: 3.7,
  },
  {
    id: 2,
    name: 'Jane Smith',
    location: 'Los Angeles',
    cgpa: 3.5,
  },
];

export default function App() {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(data.length + 1);
  const [editRow, setEditRow] = useState(null);
  const [newRow, setNewRow] = useState({ name: '', location: '', cgpa: 0.0 });
  const [addingNew, setAddingNew] = useState(false); // Track if "Add New" is clicked

  const handleEdit = (row) => {
    setEditRow({ ...row }); // Start editing by copying the current row data
  };

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.id !== row.id);
    setData(newData);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editRow.id ? { ...item, ...editRow } : item
    );
    setData(updatedData);
    setEditRow(null); // Exit edit mode
  };

  const handleCancelEdit = () => {
    setEditRow(null); // Exit edit mode without saving
  };

  const handleAddNew = () => {
    setAddingNew(true);
  };

  const handleSaveNew = () => {
    setData([...data, { id: count, ...newRow }]);
    setCount(count + 1);
    setNewRow({ name: '', location: '', cgpa: 0.0 });
    setAddingNew(false); // Hide input fields after adding
  };

  const columns = [
    {
      name: 'Sr. No',
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: '80px',
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? ( // If row is being edited
          <input
            type="text"
            value={editRow.name}
            onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
          />
        ) : (
          row.name
        ),
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? ( // If row is being edited
          <input
            type="text"
            value={editRow.location}
            onChange={(e) =>
              setEditRow({ ...editRow, location: e.target.value })
            }
          />
        ) : (
          row.location
        ),
    },
    {
      name: 'CGPA',
      selector: 'cgpa',
      sortable: true,
      cell: (row) =>
        editRow && editRow.id === row.id ? ( // If row is being edited
          <input
            type="number"
            value={editRow.cgpa}
            onChange={(e) =>
              setEditRow({ ...editRow, cgpa: parseFloat(e.target.value) })
            }
          />
        ) : (
          row.cgpa
        ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          {editRow && editRow.id === row.id ? ( // If row is being edited
            <>
              <button onClick={handleSaveEdit} className="btn btn-success">
                Save Edit
              </button>
              <button onClick={handleCancelEdit} className="btn btn-secondary">
                Cancel Edit
              </button>
            </>
          ) : (
            <>
              <Edit3
                onClick={() => handleEdit(row)}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
              <Trash2
                onClick={() => handleDelete(row)}
                style={{ cursor: 'pointer' }}
              />
            </>
          )}
        </div>
      ),
      maxWidth: '100px',
    },
  ];

  return (
    <div className="main">
      <DataTable columns={columns} data={data} />
      {addingNew ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newRow.location}
            onChange={(e) => setNewRow({ ...newRow, location: e.target.value })}
          />
          <input
            type="number"
            placeholder="CGPA"
            value={newRow.cgpa}
            onChange={(e) =>
              setNewRow({ ...newRow, cgpa: parseFloat(e.target.value) })
            }
          />
          <button
            onClick={handleSaveNew}
            type="button"
            className="btn btn-primary"
          >
            Save New
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddNew}
          type="button"
          className="btn btn-primary mt-5"
        >
          Add New
        </button>
      )}
    </div>
  );
}
