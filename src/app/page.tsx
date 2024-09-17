import TaskPage from "../../pages/tasks";
import CalendarComponent from "../../components/Calender";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center">    
  Task Management
    </div>
    <TaskPage/>
    <CalendarComponent/>
    </>
  );
}
