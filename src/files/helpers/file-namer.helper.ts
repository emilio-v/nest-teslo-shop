import { v4 as uuidV4 } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuidV4()}.${fileExtension}`;

  callback(null, fileName);
};
