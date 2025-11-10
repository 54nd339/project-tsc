import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore'
import { db } from './config'

/**
 * Get a single document from a collection
 */
export async function getDocument<T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T
    }
    return null
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

/**
 * Get all documents from a collection with optional constraints
 */
export async function getCollection<T = DocumentData>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName)
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[]
  } catch (error) {
    console.error('Error getting collection:', error)
    throw error
  }
}

/**
 * Add a document to a collection
 */
export async function addDocument<T = DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  try {
    const collectionRef = collection(db, collectionName)
    const docRef = await addDoc(collectionRef, data as DocumentData)
    return docRef.id
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

/**
 * Update a document in a collection
 */
export async function updateDocument<T = Partial<DocumentData>>(
  collectionName: string,
  documentId: string,
  data: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, data as DocumentData)
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

/**
 * Delete a document from a collection
 */
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

/**
 * Query helper exports
 */
export { where, orderBy, limit, query }

