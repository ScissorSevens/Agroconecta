import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";

/**
 * Middleware para restringir el acceso según el rol del usuario.
 * 
 * @param allowedRoles Lista de roles permitidos (ej: ["admin", "vendedor"])
 */
export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // El token ya fue verificado en verifyFirebase.ts
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }

      const idToken = authHeader.split(" ")[1];
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

      // Verificamos si el token tiene un rol asignado en custom claims
      const userRole = decodedToken.role;

      if (!userRole) {
        return res.status(403).json({ message: "El usuario no tiene un rol asignado" });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
      }

      // Guardamos el rol y uid en la request
      (req as any).user = {
        uid: decodedToken.uid,
        role: userRole,
      };

      next();
    } catch (error) {
      console.error("Error en checkRole:", error);
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};
