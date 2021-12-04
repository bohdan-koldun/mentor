export const groupTasksByFullName = tasks => {
  const result = {}

  for (const task of tasks) {
    result[task.mentor.fullName] = result[task.mentor.fullName] || {}
    result[task.mentor.fullName][task.task.name] =
      result[task.mentor.fullName][task.task.name] || []

    result[task.mentor.fullName][task.task.name].push({
      ...task.task,
      photo: task.photo,
      date: task.date || task.createdAt,
    })
  }

  return result
}
