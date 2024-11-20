export const validarCamposPetMiddleware = (req, res, next) => {
    try {
        const { nome, idade, raca, nomeTutor } = req.body;

        if(!nome) {
            return res.status(400).send({
                ok: false,
                mensagem: "O campo nome não foi informado"
            });
        }

        if(!idade) {
            return res.status(400).send({
                ok: false,
                mensagem: "O campo idade não foi informado"
            });
        }

        if(!raca) {
            return res.status(400).send({
                ok: false,
                mensagem: "O campo raca não foi informado"
            });
        }

        if(!nomeTutor) {
            return res.status(400).send({
                ok: false,
                mensagem: "O campo nomeTutor não foi informado"
            });
        }

        next();
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
}