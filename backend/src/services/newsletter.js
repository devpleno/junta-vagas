const findEmails = async coll => {
  const cursorEmail = await coll.find(
    {
      "status": true
    }).toArray()

  return cursorEmail
}

const getEmailsConfirmed = async (connectionDB) => {
  const db = connectionDB.db(process.env.DB_NAME)
  const collection = db.collection("newsletters")
  return findEmails(collection)
}

module.exports = { getEmailsConfirmed }