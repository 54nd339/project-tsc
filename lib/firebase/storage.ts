import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadResult,
  StorageReference,
} from 'firebase/storage'
import { storage } from './config'

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  path: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    
    if (onProgress) {
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            onProgress(progress)
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          }
        )
      })
    } else {
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

/**
 * Get download URL for a file
 */
export async function getFileURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.error('Error getting file URL:', error)
    throw error
  }
}

/**
 * List all files in a directory
 */
export async function listFiles(path: string): Promise<string[]> {
  try {
    const storageRef = ref(storage, path)
    const result = await listAll(storageRef)
    const urls = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    )
    return urls
  } catch (error) {
    console.error('Error listing files:', error)
    throw error
  }
}

