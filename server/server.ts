import expressApp from './app';
const PORT = process.env.PORT || 9000;
const server = expressApp().listen(PORT, () => {
    console.log('Express server listening on ' + PORT);
});
export {server};