import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectCpu = () => {
  const [cpus, setCpus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cpus")
      .then(res => setCpus(res.data))
      .catch(() => setCpus([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading CPUs...</div>;

  return (
    <div>
      <h2>Select CPU</h2>
      <ul>
        {cpus.map((cpu) => (
          <li key={cpu._id}>
            <b>{cpu.name}</b> ({cpu.family}) - {cpu.threads} Threads - {cpu.base_clock} GHz
            {/* Add a select button or link as per your flow */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectCpu;
