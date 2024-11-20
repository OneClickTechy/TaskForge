import Task from "./Task"
import { useGetTasksQuery } from "../../app/services/taskSlicer"
import LoadingPage from '../../components/LoadingPage'
const MyTasks = () => {
    const { data, isLoading, error } = useGetTasksQuery();
    console.log(data);
    if(isLoading){
        return <LoadingPage content={"Loading, Please wait...."} />
    }

  return (
    <section>
        <h1>My Tasks</h1>
        { data.map((item) => (
            <Task item={item} key={item._id}/>
        )) }
    </section>
  )
}

export default MyTasks