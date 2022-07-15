const getToday = () => {
  const today = new Date()
  return today.getFullYear() + '-' + 0 + (today.getMonth() + 1) + '-' + today.getDate()
}

const queryDate = getToday()

const getJobsToday = async coll => {
  const cursorJobs = await coll.find(
    {
      "postedAt": {
        $gte: `${queryDate} 00:00:00`
      }
    }).toArray()

  return cursorJobs
}

module.exports = getJobsToday