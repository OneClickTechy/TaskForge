const CreateTask = () => {
  return (
    <form>
        <label htmlFor="title">title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="description">description</label>        
        <input type="text" id='description' name='description' />

        <label htmlFor="duedate">duedate</label>
        <input type="date" id="duedate" name="duedate" />

        <label htmlFor="category">category</label>
        
    </form>
  )
}

export default CreateTask