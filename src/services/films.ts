import Film from "../models/film";
import Remark from "../models/remark";
import { getRemark } from "./remark";

const fetch = require('node-fetch');

const API_URL = 'https://api.themoviedb.org/3';
const key = '5f6dfd4cbbe3778697b2287c28081cc5'
const contentTypes = {
    json: 'application/json; charset=utf-8',
    isMultiPart: 'application/json; charset=utf-8',
};

export const getAllFilms = async (page?: number, size?: number) => {
    const currentPage = page ?? 2
    const currentSize = size ?? 20
    const count = await Film.count();
    // if (count === 0) {
    await saveMovies()
    // }

    const data = await Film.find()
        .limit(currentSize ?? 20 * 1)
        .skip((currentPage ?? 2 - 1) * currentSize)
        .exec();
    return {
        data,
        totalPages: Math.ceil(count / currentSize),
        currentPage: page
    };
}

export const getFilmDetail = async (userId: string, filmId: string) => {
    try {
        const internalData = await Film.findById(filmId).populate("remarks");
        const remarks = await getRemark(userId, filmId)

        return {
            film: internalData,
            remarks: remarks,
        };
    } catch (error) {
        throw error
    }
}

export const saveMovies = async () => {
    try {
        const apiUrl = `${API_URL}/movie/popular?api_key=${key}&language=en-US`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': contentTypes.json,
                // token, 
            },
            data: JSON.stringify({}),
        };

        const newFilms = await fetch(apiUrl, requestOptions).then((res: any) => res.json());
        const currentFilms = await Film.find()
        const differenceFilms = newFilms.results.filter(({ id: id1 }: { id: string }) => !currentFilms.some(({ externalId: id2 }) => id2 === id1));
        await Film.insertMany([
            ...differenceFilms.map((x: any) => ({
                externalId: x.id,
                original_title: x.original_title,
                overview: x.overview,
                poster_path: x.poster_path,
            }))
        ])

    } catch (error) {
        throw error
    }
}