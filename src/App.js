import React, { useState } from "react";
import Employees from "./EmployeeList";
import Details from "./DetailsPage";

function App() {
  const [selectedUser, setSelectedUser] = useState();

  const goBack = () => {
    setSelectedUser();
  };

  return (
    <div className="App">
      <header className="EmployeeHeader">Employees</header>
      {selectedUser ? (
        <Details selectedUser={selectedUser} goBack={goBack} />
      ) : (
        <Employees setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
}

export default App;
