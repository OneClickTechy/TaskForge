const Task = ({item}) => {
  
  const {_id, name, description, duedate, priority, completed} = item;
  const priorityColor =  ["red", "green", "blue", "gray"];
  
  const handleCheck = () => {};
  return (
    <article id={item._id}>
      <label htmlFor="completed" className="sr-only">completed</label>
      <input type="checkbox" name="completed" checked={completed} onChange={handleCheck}  id="completed" className="h-6 w-6" />
      <h3>{item.title}</h3>
      <small>{new Date(duedate).toISOString()}</small>
      <small>{priority}</small>

    </article>
  )
}

export default Task
// {
//   "_id": "673bb74b0072644e751b2dc4",
//   "name": "jeyapandi",
//   "description": "frontend developer",
//   "duedate": "2024-12-30T00:00:00.000Z",
//   "priority": 1,
//   "category": "work",
//   "completed": false,
//   "userId": "673a64a9cb41676e158b2231",
//   "createdAt": "2024-11-18T21:53:15.484Z",
//   "updatedAt": "2024-11-18T21:53:15.484Z",
//   "__v": 0
// }