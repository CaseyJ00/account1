import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { collection, doc, onSnapshot } from 'firebase/firestore'

const DbContext = React.createContext()

export function useDb() {
  return useContext(DbContext)
}

export function DbProvider({ children }) {
  const [loading, setLoading] = useState(true)

  function getColRef(colName) {
    return collection(db, colName)
  }

  function getDocRef(colName, docName) {
    // console.log('getDocRef: ', colName, docName)
    return doc(db, colName, docName)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (doc) => {
      console.log('onSnapshot')

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    getColRef,
    getDocRef,
  }

  return (
    <DbContext.Provider value={value}>
      {!loading && children}
    </DbContext.Provider>
  )
}
