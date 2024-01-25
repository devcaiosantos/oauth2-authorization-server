export default (router, app) => {
    router.post("hello", 
        app.oauth.authorise(),
        function helloWorld(req, res) {
            res.send("Hello World OAuth2!");
        }
    );

    return router;
};