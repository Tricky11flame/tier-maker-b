// src/middleware/validate.ts
import type { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.errors.map((e) => ({
            path: e.path[1],
            message: e.message,
          })),
        });
      }
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };