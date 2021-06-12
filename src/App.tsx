import React, { useState } from 'react';
import logo from './logo.svg';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counterSlice';
import {
  useFetchLaunchesQuery,
  useLazyFetchLaunchQuery
} from './features/launches/launches-api-slice';

import './App.css';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data = [], isError, isLoading } = useFetchLaunchesQuery();
  const [getLaunch, { data: LaunchData }] = useLazyFetchLaunchQuery();

  const handleClick = (id: string) => {
    getLaunch(id);
    if (LaunchData) console.log(LaunchData);
  };

  return (
    <div className="App">
      <div>Number of Launches: {data.length}</div>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Name</th>
            <th>Patch</th>
          </tr>
        </thead>
        <tbody>
          {data.map((launch, i) => (
            <tr key={launch.id} onClick={() => handleClick(launch.id)}>
              <td>{launch.flight_number}</td>
              <td>{launch.name}</td>
              <td>
                <img src={launch.links.patch.small} width={50} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
