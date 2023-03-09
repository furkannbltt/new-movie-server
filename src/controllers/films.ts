import { Request, Response, NextFunction } from "express";
import { getAllFilms, getFilmDetail, saveMovies } from "../services/films";

export const getAll = async (request: Request, response: Response, next: NextFunction) => {
    const { page = 1, size = 10 } = request.query;

    try {
        const data = await getAllFilms(page as number, size as number)
        return response.json(data);

    } catch (error) {
        next(error)
    }
}


export const getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const body = request.body
        const result = await getFilmDetail(body.userId, body.filmId)
        return response.json(result);
    } catch (error) {
        next(error)
    }
};

