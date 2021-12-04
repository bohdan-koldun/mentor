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
export const countOneTaskByFullName = tasks => {
  const result = {}

  for (const task of tasks) {
    const count = (result[task.mentor.fullName]?.count || 0) + 1
    result[task.mentor.fullName] = {
      count,
      teenager: task.mentor.teenager.fullName,
    }
  }

  return result
}
