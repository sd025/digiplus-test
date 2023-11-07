import DataTable from 'react-data-table-component';
import { Edit3, Trash2 } from 'react-feather';

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

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
  },
  {
    name: 'Location',
    selector: 'location',
    sortable: true,
  },
  {
    name: 'CGPA',
    selector: 'cgpa',
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Edit3
          onClick={() => handleEdit(row)}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
        <Trash2
          onClick={() => handleDelete(row)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    ),
    maxWidth: '100px',
  },
];

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


return (
  <>
  {}
  </>
)