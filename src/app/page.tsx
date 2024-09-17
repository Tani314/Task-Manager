import TaskPage from "../../pages/tasks";
import CalendarComponent from "../../components/Calender";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center text-3xl font-bold mb-4">    
  Task Management
    </div>
    <TaskPage/>
    <CalendarComponent/>
    </>
  );
}
