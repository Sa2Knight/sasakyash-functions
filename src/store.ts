import * as admin from 'firebase-admin'

admin.initializeApp()
const firestore = admin.firestore()

export class Collection {
  private _reference: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor(private name: string) {
    this._reference = firestore.collection(this.name)
  }

  get reference() {
    return this._reference
  }
}

export class Document {
  private collection: Collection

  constructor(private collectionName: string, private key: string) {
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
