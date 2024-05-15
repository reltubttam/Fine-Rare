import { NextFunction, Request, Response } from 'express';
import CsvHandler from '../lib/csvHandler';

export default async function csvUploadRoute(req: Request, res: Response, next:NextFunction) {
  try {
    req.pipe(req.busboy);

    res.send(true);

    req.busboy.on('error', (err) => {
      console.log(err);
    });

    req.busboy.on('file', (name, file) => {
      const csvHandler = CsvHandler();
      console.log(`file ${name} recieved`);
      file
        .on('data', csvHandler.onData)
        .on('close', csvHandler.onClose)
        .on('error', csvHandler.onerror);
    });
  } catch (err) {
    next(err);
  }
}
