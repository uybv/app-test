const stage = process.env.REACT_APP_STAGE;
const apiDomain = stage == 'dev' ? 'dev-app-api.wgs.jp' : 'dev-app-api.wgs.jp';
const apiBaseUrl = `https://${apiDomain}`;
export { apiDomain, apiBaseUrl };
