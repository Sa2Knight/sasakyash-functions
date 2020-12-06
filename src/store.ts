import * as admin from 'firebase-admin'
import { CollectionName } from './types'

admin.initializeApp()
const firestore = admin.firestore()

export class Collection {
  private _reference: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor(private name: CollectionName) {
    this._reference = firestore.collection(this.name)
  }

  get reference() {
    return this._reference
  }

  async clear() {
    const docs = await this.reference.listDocuments()
    docs.forEach(async doc => await doc.delete())
  }
}

export class Document {
  private collection: Collection

  constructor(private collectionName: CollectionName, private key: string) {
    this.collection = new Collection(this.collectionName)
  }

  async read() {
    const snapshot = await this.collection.reference.doc(this.key).get()
    const storedData = snapshot.data()
    return storedData?.result || null
  }

  async write(resultValue: any) {
    await this.collection.reference.doc(this.key).set({ result: resultValue })
  }
}
