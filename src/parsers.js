import yaml from 'js-yaml';

export const parseJson = (data) => JSON.parse(data);

export const parseYaml = (data) => yaml.load(data);
