import { join } from 'path';
import { mkdir, copyFile } from 'node:fs/promises';
import { statSync } from 'fs';

import moment from 'moment';
import { generateId, exec } from '@rugo-vn/common';

export const generateUniqueRandomId = (name) => `${moment().format('YYYYMMDD')} - ${name ? (name + ' - ') : ''}${generateId()}`;
export const getExportRootDir = id => `/tmp/rugo.api.${id}`;
export const getExportFilePath = id => `/tmp/rugo.api.${id}.zip`;

export const exportApi = async (name, schemas, createModel) => {
  const id = generateUniqueRandomId(name);
  const root = getExportRootDir(id);
  const outputPath = getExportFilePath(id);

  await mkdir(root);

  for (const schema of schemas) {
    const model = await createModel(schema.__name, schema);
    const thePath = await model.export();
    const schemaPath = join(root, schema.__name);

    if (statSync(thePath).isDirectory()) {
      await exec(`cp -rL "${thePath}" "${schemaPath}"`);
    } else {
      await copyFile(thePath, schemaPath);
    }
  }

  // const { stdout, stderr } =
  await exec(`zip -r "${outputPath}" .`, {
    cwd: root
  });

  // stdout.split('\n').map(i => i.trim()).filter(i => i).forEach(console.log);
  // stderr.split('\n').map(i => i.trim()).filter(i => i).forEach(console.log);

  return id;
};

export const importApi = async (schemas, createModel, filePath) => {
  const id = generateUniqueRandomId();
  const root = getExportRootDir(id);

  await mkdir(root);

  // const { stdout, stderr } =
  await exec(`unzip "${filePath}"`, {
    cwd: root
  });
  // stdout.split('\n').map(i => i.trim()).filter(i => i).forEach(console.log);
  // stderr.split('\n').map(i => i.trim()).filter(i => i).forEach(console.log);

  for (const schema of schemas) {
    const model = await createModel(schema.__name, schema);
    const schemaPath = join(root, schema.__name);
    await model.import(schemaPath);
  }

  await exec(`rm -rf "${root}"`);
};
