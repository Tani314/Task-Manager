import TaskPage from "../../pages/tasks";
import CalendarComponent from "../../components/Calender";
import Progress from "../../pages/progress";
import CategoriesPage from "../../pages/categories";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center text-3xl font-bold mb-4">
        Task Management
      </div>
      <div className="flex justify-center items-center flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 place-content-center">
          <div>
            <TaskPage />
          </div>
          <div >
            <CalendarComponent />
          </div>
        </div>
        <div className="flex flex-col space-x-4">
          <div className="grid grid-cols-2 gap-4 place-content-center">
            <div>
            <CategoriesPage />
          </div>
          <div>
            <Progress />
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
