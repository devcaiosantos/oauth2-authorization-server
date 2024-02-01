export default (router, oauth) => {
    router.post("/hello", 
        oauth.authorise(),
        function helloWorld(req, res) {
            res.send("Hello World OAuth2!");
        }
    );

    return router;
};