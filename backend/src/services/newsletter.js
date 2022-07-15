const getEmailsConfirmed = async coll => {
  const cursorEmail = await coll.find(
    {
      "status": true
    }).toArray()

  return cursorEmail
}

module.exports = getEmailsConfirmed