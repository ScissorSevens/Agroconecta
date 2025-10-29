import { firebaseAdmin } from "../config/firebase";

async function setUserRole() {
  const uid = "EtHF051MO1fSY4xMZ6pzxLqg4I12"; // 👈 UID de tu usuario (del token)
  const role = "admin"; // o "vendedor", "comprador"

  await firebaseAdmin.auth().setCustomUserClaims(uid, { role });
  console.log(`✅ Rol '${role}' asignado correctamente al usuario ${uid}`);
}

setUserRole()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error asignando rol:", err);
    process.exit(1);
  });
