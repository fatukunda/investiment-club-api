import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const dUri = new Datauri();
// eslint-disable-next-line max-len
const dataUri = (req) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };
