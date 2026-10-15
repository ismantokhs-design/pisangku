import { db } from './firebase-config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  setDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Simpan atau Perbarui Data User ke Koleksi 'users'
export async function simpanUser(user) {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      lastLogin: serverTimestamp()
    }, { merge: true }); // merge: true agar data lama tidak tertimpa jika user sudah ada
    return { success: true };
  } catch (error) {
    console.error("Gagal menyimpan data user:", error);
    return { success: false, error };
  }
}

// Simpan Data Pohon Baru
export async function tambahPohon(varietas, tanggalTanam, jumlah) {
  try {
    const docRef = await addDoc(collection(db, "pohon_pisang"), {
      varietas: varietas,
      tanggalTanam: tanggalTanam,
      jumlah: Number(jumlah),
      status: "Vegetatif",
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Gagal menambah data pohon:", error);
    return { success: false, error };
  }
}

// Ambil Semua Data Pohon
export async function ambilSemuaPohon() {
  try {
    const querySnapshot = await getDocs(collection(db, "pohon_pisang"));
    let daftarPohon = [];
    querySnapshot.forEach((doc) => {
      daftarPohon.push({ id: doc.id, ...doc.data() });
    });
    return daftarPohon;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
}