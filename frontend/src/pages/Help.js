import React from 'react';
import Header from '../components/header';

function Help() {
  return (
    <div className="background help d-flex flex-column align-items-center justify-content-center">
      <Header />

      <h1 className="mt-5">Help</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Test</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test1</td>
          </tr>
          <tr>
            <td>test2</td>
          </tr>
          <tr>
            <td>test3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Help;
