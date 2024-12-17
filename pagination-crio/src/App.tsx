import { useEffect, useState } from 'react'
import './App.css';

const LIMIT = 10;

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
};

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const thisData = await response.json() as Employee[];
        setData(thisData);
      } catch (error) {
        console.error(error);
        alert('failed to fetch data');
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <h1 style={{textAlign: 'center'}}>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {
            data.slice(((page - 1)*LIMIT), page * LIMIT).map((employee, key) =>
              <tr key={key}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <nav style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', margin: '5px 0'}}>
          <button onClick={() => setPage(Math.max(page - 1, 1))}>Previous</button>
          <span className="btn-like">{page}</span>
          <button onClick={() => setPage(Math.min(page + 1, 5))}>Next</button>
      </nav>
    </>
  )
}

export default App;
