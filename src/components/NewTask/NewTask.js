import useHttpRequest from "../../hooks/use-httpRequest";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttpRequest();
  
  const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase generated ID
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-http-61584-default-rtdb.firebaseio.com/tasks.json",
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: {text: taskText}
    }, createTask.bind(null, taskText)) //'bind' to pre-configure this function
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
