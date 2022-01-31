import React, { useEffect, useState } from 'react';
import useHttpRequest from './hooks/use-httpRequest';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest: fetchTasks} = useHttpRequest()

  useEffect(() => {
    const transformTasks = (taskObj) => {
			const loadedTasks = [];

			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
			}
			setTasks(loadedTasks);
    };
    
    fetchTasks({
			url: "https://react-http-61584-default-rtdb.firebaseio.com/tasks.json",
		}, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
