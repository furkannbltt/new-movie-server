import { Request, Response, NextFunction } from "express";
import { createRemark, getRemark } from "../services/remark";
import { getRemarkValidation } from "../utils/validation-helper";

export const create = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await createRemark(request.body)
        if (data) return response.json({ status: true, error: "Remarks added successfully." });
        else return response.json({ status: false, error: "Failed to add Remarks to the database" });
    } catch (ex) {
        next(ex);
    }
};

export const get = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const body = request.body
        const { error } = getRemarkValidation(body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const result = await getRemark(body.userId, body.filmId)
        if (result) return response.json({ status: true, result });
        else return response.json({ status: false, error: "Not found!" });
    } catch (ex) {
        next(ex);
    }
};
