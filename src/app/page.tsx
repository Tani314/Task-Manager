import TaskPage from "../../pages/tasks";
import CalendarComponent from "../../components/Calender";
import Progress from "../../pages/progress";
import CategoriesPage from "../../pages/categories";

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundImageStyle}>
    <div className="flex justify-center items-center text-3xl font-bold mb-4">
        Task Management
      </div>
      <div className="flex flex-col space-y-4">

        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <TaskPage />
          </div>
          <div className="flex-1">
            <CalendarComponent />
          </div>
        </div>
        
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <CategoriesPage />
          </div>
          <div className="flex-1">
            <Progress />
          </div>
        </div>
      </div>
    </div>
  );
}
