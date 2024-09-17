// pages/update-task/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import UpdateTask from '../../components/UpdateTask'; // Adjust path if necessary
import axios from '../../utils/axios'; // Adjust path if necessary
import { Task } from '../../types/types'; // Adjust path if necessary

interface UpdateTaskPageProps {
  task: Task | null;
}

const UpdateTaskPage = ({ task }: UpdateTaskPageProps) => {
  const router = useRouter();

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Update Task</h1>
      <UpdateTask task={task} onClose={() => router.push('/tasks')} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || typeof id !== 'string') {
    return { props: { task: null } };
  }

  try {
    const response = await axios.get(`/tasks/${id}`);
    const task: Task = response.data;
    return { props: { task } };
  } catch (error) {
    console.error('Error fetching task:', error);
    return { props: { task: null } };
  }
};

export default UpdateTaskPage;
